import {
  ForbiddenException,
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from '~/product/dto';
import { PageDto, PageMetaDto, PageOptionsDto } from '~/common/dtos';
import { Prisma, Products } from '@prisma/client';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import { ProductMainFields, ProductWithAttributes } from '~/product/types';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  private readonly selectedFields = {
    id: true,
    title: true,
    description: true,
    images: true,
    price: true,
  };

  private async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const images = await this.cloudinary.uploadImages(files).catch(() => {
      throw new BadRequestException('Invalid file type');
    });

    return images.map((image) => image.url);
  }

  async create(
    dto: CreateProductDto,
    userId: string,
    files: Express.Multer.File[],
  ): Promise<Products> {
    const { categoryId, attributes, ...data } = dto;
    const category = await this.prisma.categories.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const attributeIds = attributes.map((attr) => attr.attributeId);
    const existingAttributes = await this.prisma.attributes.findMany({
      where: {
        id: {
          in: attributeIds,
        },
      },
    });

    if (existingAttributes.length !== attributeIds.length) {
      throw new NotFoundException('One or more attributes not found');
    }

    const imageUrls = await this.uploadImages(files);

    const product = await this.prisma.products.create({
      data: {
        ...data,
        seller: {
          connect: { id: userId },
        },
        category: {
          connect: { id: categoryId },
        },
        attributeValues: {
          create: attributes,
        },
      },
    });

    return this.prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        images: imageUrls,
      },
    });
  }

  async getById(productId: string): Promise<ProductWithAttributes> {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        sellerId: true,
        title: true,
        description: true,
        price: true,
        images: true,
        category: true,
        attributeValues: {
          select: {
            value: true,
            attribute: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!product) {
      throw new NotFoundException();
    }
    const result = {
      ...product,
      attributes: product.attributeValues.map((attr) => ({
        key: attr.attribute.name,
        value: attr.value,
      })),
    };

    delete result.attributeValues;

    return result;
  }

  async getAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductMainFields>> {
    const { skip, take, orderBy, order } = pageOptionsDto;
    const [data, itemCount] = await Promise.all([
      this.prisma.products.findMany({
        select: { ...this.selectedFields },
        skip,
        take,
        orderBy: {
          [orderBy]: order,
        },
      }),
      this.prisma.products.count(),
    ]);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, pageMetaDto);
  }

  async searchProducts(
    title: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductMainFields>> {
    const { skip, take, orderBy, order } = pageOptionsDto;

    if (!title) {
      return new PageDto([], new PageMetaDto({ pageOptionsDto, itemCount: 0 }));
    }

    const where: Prisma.ProductsWhereInput = {
      title: {
        contains: title,
        mode: 'insensitive',
      },
    };

    const [data, itemCount] = await Promise.all([
      this.prisma.products.findMany({
        select: { ...this.selectedFields },
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: order,
        },
      }),
      this.prisma.products.count({ where }),
    ]);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, pageMetaDto);
  }

  async getByCategory(
    categoryName: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductMainFields>> {
    const { skip, take, orderBy, order } = pageOptionsDto;
    const [data, itemCount] = await Promise.all([
      this.prisma.products.findMany({
        select: { ...this.selectedFields },
        skip,
        take,
        orderBy: {
          [orderBy]: order,
        },
        where: {
          category: {
            name: {
              equals: categoryName,
              mode: 'insensitive',
            },
          },
        },
      }),
      this.prisma.products.count({
        where: {
          category: {
            name: {
              equals: categoryName,
              mode: 'insensitive',
            },
          },
        },
      }),
    ]);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, pageMetaDto);
  }

  async deleteProduct(
    productId: string,
    userId: string,
  ): Promise<ProductMainFields> {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException();
    }

    if (product.sellerId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.products.delete({
      select: { ...this.selectedFields },
      where: {
        id: product.id,
      },
    });
  }

  async updateProduct(
    dto: UpdateProductDto,
    productId: string,
    userId: string,
    files: Express.Multer.File[],
  ): Promise<Products> {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.sellerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    let imageUrls: string[];
    if (Array.isArray(files)) {
      imageUrls = await this.uploadImages(files);
    }

    return this.prisma.products.update({
      where: { id: productId },
      data: {
        ...dto,
        images: {
          push: imageUrls,
        },
      },
    });
  }
}
