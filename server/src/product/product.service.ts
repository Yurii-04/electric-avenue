import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '~/product/dto';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
  PageOptionsWithoutSortingDto,
} from '~/common/dtos';
import { Prisma, Products } from '@prisma/client';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import {
  Image,
  ProductWithAttributes,
  ProductWithImages,
  ProductWithRelations,
} from '~/product/types';
import { MappedAttribute } from '~/product-attributes/types';
import { ProductAttributesService } from '~/product-attributes/productAttributes.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly productAttributes: ProductAttributesService,
  ) {}

  private transformProduct(product: ProductWithRelations) {
    return {
      ...product,
      category: product.category.name,
      productAttributes: product.productAttributes.map((attr) => ({
        key: attr.attribute.name,
        value: attr.optionValue.value,
      })),
    };
  }

  private async validateProductAccess(productId: string, userId: string) {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
      include: { productImages: true },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.sellerId !== userId)
      throw new ForbiddenException('Access denied');

    return product;
  }

  private async validateCategory(categoryId: string) {
    const category = await this.prisma.categories.findUnique({
      where: { id: categoryId },
    });

    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  private async handleProductImages(
    currentImages: Image[] = [],
    newFiles: Express.Multer.File[] = [],
    imagesToDelete: string[] = [],
  ) {
    if (imagesToDelete.length > 0) {
      const remainingImages = currentImages.filter(
        (img) => !imagesToDelete.includes(img.publicId),
      );

      if (remainingImages.length === 0 && newFiles.length === 0) {
        throw new ForbiddenException("You can't delete all images");
      }
    }

    let uploadedImages: Image[] = [];
    if (newFiles.length > 0) {
      uploadedImages = await this.cloudinary
        .uploadImages(newFiles)
        .catch((e) => {
          console.error(e);
          throw new InternalServerErrorException('Failed to upload images');
        });
    }
    return { uploadedImages, imagesToDelete };
  }

  private async cleanupImages(publicIds: string[]) {
    if (publicIds.length > 0) {
      await this.cloudinary.deleteImages(publicIds).catch((e) => {
        console.error(e);
        throw new InternalServerErrorException('Failed to delete images');
      });
    }
  }

  async create(
    dto: CreateProductDto,
    userId: string,
    files: Express.Multer.File[],
  ) {
    const { categoryId, attributes, ...data } = dto;
    await this.validateCategory(categoryId);
    const mappedAttributes = await this.productAttributes.mapProductAttributes(
      attributes,
      categoryId,
    );
    const { uploadedImages } = await this.handleProductImages([], files);

    try {
      const product = await this.prisma.$transaction(async (prisma) => {
        const product = await prisma.products.create({
          data: {
            ...data,
            seller: { connect: { id: userId } },
            category: { connect: { id: categoryId } },
            productAttributes: {
              create: mappedAttributes.map((attr) => ({
                attributeId: attr.attributeId,
                optionValueId: attr.optionValueId,
              })),
            },
          },
        });

        await prisma.productImages.createMany({
          data: uploadedImages.map((img) => ({
            productId: product.id,
            url: img.url,
            publicId: img.publicId,
          })),
        });

        return product;
      });

      return this.getById(product.id);
    } catch (error) {
      console.error(error);
      await this.cleanupImages(uploadedImages.map((img) => img.publicId));
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async getById(productId: string): Promise<ProductWithAttributes> {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
      omit: { categoryId: true, sellerId: true },
      include: {
        category: { select: { name: true } },
        productImages: { select: { url: true, publicId: true } },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            photo: true,
          },
        },
        productAttributes: {
          select: {
            attribute: { select: { name: true } },
            optionValue: { select: { value: true } },
          },
        },
      },
    });
    if (!product) throw new NotFoundException('Product not found');

    return this.transformProduct(product);
  }

  async searchProducts(
    query: string,
    pageOptionsDto: PageOptionsWithoutSortingDto,
  ): Promise<PageDto<Pick<Products, 'title'>>> {
    const where: Prisma.ProductsWhereInput = {
      title: { contains: query, mode: 'insensitive' },
    };
    const { skip, take } = pageOptionsDto;
    const [data, itemCount] = await Promise.all([
      this.prisma.products.groupBy({
        by: ['title'],
        where,
        skip,
        take,
        orderBy: { title: 'asc' },
      }),
      this.prisma.products
        .groupBy({
          by: ['title'],
          where,
        })
        .then((res) => res.length),
    ]);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, pageMetaDto);
  }

  async findProducts(
    { categoryId, title }: Partial<Pick<Products, 'categoryId' | 'title'>>,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductWithImages>> {
    const { skip, take, orderBy, order } = pageOptionsDto;

    const where: Prisma.ProductsWhereInput = {
      ...(categoryId && { category: { id: categoryId } }),
      ...(title && { title: { contains: title, mode: 'insensitive' } }),
    };

    const [data, itemCount] = await Promise.all([
      this.prisma.products.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          categoryId: true,
          productImages: { select: { url: true } },
          price: true,
        },
        where,
        skip,
        take,
        orderBy: { [orderBy]: order },
      }),
      this.prisma.products.count({ where }),
    ]);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, pageMetaDto);
  }

  async deleteProduct(productId: string, userId: string) {
    const product = await this.validateProductAccess(productId, userId);
    await this.prisma.products.delete({ where: { id: product.id } });
    await this.cleanupImages(product.productImages.map((img) => img.publicId));

    return { success: true, message: 'Product deleted successfully' };
  }

  async updateProduct(
    dto: UpdateProductDto,
    productId: string,
    userId: string,
    files: Express.Multer.File[],
  ): Promise<ProductWithAttributes> {
    const { imagesToDelete = [], attributes, categoryId, ...rest } = dto;
    const product = await this.validateProductAccess(productId, userId);

    if (categoryId) {
      if (!attributes)
        throw new BadRequestException(
          'With the new category, the required field is attributes',
        );
      await this.validateCategory(categoryId);
    }
    const { uploadedImages } = await this.handleProductImages(
      product.productImages,
      files,
      imagesToDelete,
    );

    let mappedAttributes: MappedAttribute[] = [];
    if (attributes) {
      mappedAttributes = await this.productAttributes.mapProductAttributes(
        attributes,
        categoryId || product.categoryId,
      );
    }

    try {
      const updatedProduct = await this.prisma.$transaction(async (prisma) => {
        if (imagesToDelete && imagesToDelete.length > 0) {
          await prisma.productImages.deleteMany({
            where: {
              productId,
              publicId: { in: imagesToDelete },
            },
          });
        }

        if (uploadedImages.length > 0) {
          await prisma.productImages.createMany({
            data: uploadedImages.map((img) => ({
              productId,
              url: img.url,
              publicId: img.publicId,
            })),
          });
        }

        return prisma.products.update({
          where: { id: productId },
          data: {
            ...rest,
            categoryId,
            productAttributes: attributes
              ? {
                  deleteMany: {},
                  createMany: {
                    data: mappedAttributes.map((attr) => ({
                      attributeId: attr.attributeId,
                      optionValueId: attr.optionValueId,
                    })),
                  },
                }
              : undefined,
          },
          omit: { categoryId: true, sellerId: true },
          include: {
            productImages: { select: { url: true, publicId: true } },
            category: true,
            seller: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                photo: true,
              },
            },
            productAttributes: {
              include: {
                attribute: true,
                optionValue: true,
              },
            },
          },
        });
      });

      await this.cleanupImages(imagesToDelete);
      return this.transformProduct(updatedProduct);
    } catch (error) {
      console.error(error);
      await this.cleanupImages(uploadedImages.map((img) => img.publicId));
      throw new InternalServerErrorException();
    }
  }
}
