import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '~/prisma/prisma.service';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from '~/common/dtos';
import { CreateProductDto } from '~/product/dto';

const mockPrismaService = {
  products: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    $transaction: jest.fn(),
  },
  categories: {
    findUnique: jest.fn(),
  },
  attributes: {
    findMany: jest.fn(),
  },
  productImages: {
    createMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  $transaction: jest.fn(),
};

const mockCloudinaryService = {
  uploadImages: jest.fn(),
  deleteImages: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;
  let prisma: typeof mockPrismaService;
  let cloudinary: typeof mockCloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get(PrismaService);
    cloudinary = module.get(CloudinaryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product and return it with attributes and images', async () => {
      const dto: CreateProductDto = {
        title: 'Test Product',
        description: 'Test description',
        categoryId: 'cat123',
        price: '100',
        attributes: [{ key: 'Color', value: 'Black' }],
      };
      const userId = 'user123';
      const files = [{ filename: 'image1.jpg' }] as Express.Multer.File[];

      const mockCategory = { id: 'cat123' };
      const mockAttributes = [
        {
          id: 'attr1',
          name: 'Color',
          attributeOptions: [
            { optionValueId: 'opt1', optionValue: { value: 'Black' } },
          ],
        },
      ];
      const mockUploadedImages = [
        { url: 'http://image.url', publicId: 'img1' },
      ];
      const mockProduct = {
        id: 'prod123',
        title: 'Test Product',
        description: 'Test description',
        price: '100',
        category: { name: 'Electronics' },
        productImages: [{ url: 'http://image.url', publicId: 'img1' }],
        productAttributes: [
          { attribute: { name: 'Color' }, optionValue: { value: 'Black' } },
        ],
      };

      prisma.categories.findUnique.mockResolvedValue(mockCategory);
      prisma.attributes.findMany.mockResolvedValue(mockAttributes);
      cloudinary.uploadImages.mockResolvedValue(mockUploadedImages);
      prisma.$transaction.mockImplementation(async (callback) =>
        callback(prisma),
      );
      prisma.products.create.mockResolvedValue({ id: 'prod123' });
      prisma.productImages.createMany.mockResolvedValue({ count: 1 });
      prisma.products.findUnique.mockResolvedValue(mockProduct);

      const result = await service.create(dto, userId, files);

      expect(prisma.categories.findUnique).toHaveBeenCalledWith({
        where: { id: 'cat123' },
      });
      expect(prisma.attributes.findMany).toHaveBeenCalledWith({
        where: { categoryId: 'cat123' },
        include: { attributeOptions: { include: { optionValue: true } } },
      });
      expect(cloudinary.uploadImages).toHaveBeenCalledWith(files);
      expect(prisma.products.create).toHaveBeenCalledWith({
        data: {
          title: 'Test Product',
          description: 'Test description',
          price: '100',
          seller: { connect: { id: 'user123' } },
          category: { connect: { id: 'cat123' } },
          productAttributes: {
            create: [{ attributeId: 'attr1', optionValueId: 'opt1' }],
          },
        },
      });
      expect(result).toEqual({
        id: 'prod123',
        title: 'Test Product',
        description: 'Test description',
        price: '100',
        category: 'Electronics',
        productImages: [{ url: 'http://image.url', publicId: 'img1' }],
        productAttributes: [{ key: 'Color', value: 'Black' }],
      });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      const dto: CreateProductDto = {
        title: 'Test Product',
        categoryId: 'cat123',
        price: '100',
        description: 'test description',
        attributes: [],
      };
      prisma.categories.findUnique.mockResolvedValue(null);

      await expect(service.create(dto, 'user123', [])).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException and cleanup images on failure', async () => {
      const dto: CreateProductDto = {
        title: 'Test Product',
        categoryId: 'cat123',
        description: 'test description',
        price: '100',
        attributes: [],
      };
      const files = [{ filename: 'image1.jpg' }] as Express.Multer.File[];
      const mockUploadedImages = [
        { url: 'http://image.url', publicId: 'img1' },
      ];

      prisma.categories.findUnique.mockResolvedValue({ id: 'cat123' });
      cloudinary.uploadImages.mockResolvedValue(mockUploadedImages);
      prisma.$transaction.mockRejectedValue(new Error('Transaction failed'));
      cloudinary.deleteImages.mockResolvedValue({});

      await expect(service.create(dto, 'user123', files)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(cloudinary.deleteImages).toHaveBeenCalledWith(['img1']);
    });
  });

  describe('getById', () => {
    it('should return a product with attributes', async () => {
      const productId = 'prod123';
      const mockProduct = {
        id: 'prod123',
        title: 'Test Product',
        description: 'Test desc',
        price: '100',
        category: { name: 'Electronics' },
        productImages: [{ url: 'http://image.url', publicId: 'img1' }],
        productAttributes: [
          { attribute: { name: 'Color' }, optionValue: { value: 'Black' } },
        ],
      };

      prisma.products.findUnique.mockResolvedValue(mockProduct);

      const result = await service.getById(productId);

      expect(prisma.products.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
        omit: { categoryId: true },
        include: expect.any(Object),
      });
      expect(result).toEqual({
        id: 'prod123',
        title: 'Test Product',
        description: 'Test desc',
        price: '100',
        category: 'Electronics',
        productImages: [{ url: 'http://image.url', publicId: 'img1' }],
        productAttributes: [{ key: 'Color', value: 'Black' }],
      });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      prisma.products.findUnique.mockResolvedValue(null);

      await expect(service.getById('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAll', () => {
    it('should return paginated products', async () => {
      const pageOptionsDto = plainToInstance(PageOptionsDto, {
        page: 1,
        take: 10,
        orderBy: 'title',
        order: 'asc',
      });
      const mockProducts = [
        {
          id: 'prod1',
          title: 'Product 1',
          price: '100',
          productImages: [{ url: 'http://image1.url' }],
        },
      ];
      prisma.products.findMany.mockResolvedValue(mockProducts);
      prisma.products.count.mockResolvedValue(1);

      const result = await service.getAll(pageOptionsDto);

      expect(prisma.products.findMany).toHaveBeenCalledWith({
        select: expect.any(Object),
        where: {},
        skip: 0,
        take: 10,
        orderBy: { title: 'asc' },
      });
      expect(result.data).toEqual(mockProducts);
      expect(result.meta.itemCount).toBe(1);
    });
  });

  describe('searchProducts', () => {
    it('should return paginated products matching search query', async () => {
      const query = 'test';
      const pageOptionsDto = plainToInstance(PageOptionsDto, {
        page: 1,
        take: 10,
        orderBy: 'title',
        order: 'asc',
      });
      const mockProducts = [
        {
          id: 'prod1',
          title: 'Test Product',
          price: '100',
          productImages: [{ url: 'http://image1.url' }],
        },
      ];
      prisma.products.findMany.mockResolvedValue(mockProducts);
      prisma.products.count.mockResolvedValue(1);

      const result = await service.searchProducts(query, pageOptionsDto);

      expect(prisma.products.findMany).toHaveBeenCalledWith({
        select: expect.any(Object),
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip: 0,
        take: 10,
        orderBy: { title: 'asc' },
      });
      expect(result.data).toEqual(mockProducts);
      expect(result.meta.itemCount).toBe(1);
    });
  });

  describe('getByCategory', () => {
    it('should return paginated products by category', async () => {
      const categoryId = 'cat123';
      const pageOptionsDto = plainToInstance(PageOptionsDto, {
        page: 1,
        take: 10,
        orderBy: 'title',
        order: 'asc',
      });
      const mockProducts = [
        {
          id: 'prod1',
          title: 'Product 1',
          price: '100',
          productImages: [{ url: 'http://image1.url' }],
        },
      ];
      prisma.products.findMany.mockResolvedValue(mockProducts);
      prisma.products.count.mockResolvedValue(1);

      const result = await service.getByCategory(categoryId, pageOptionsDto);

      expect(prisma.products.findMany).toHaveBeenCalledWith({
        select: expect.any(Object),
        where: { category: { id: categoryId } },
        skip: 0,
        take: 10,
        orderBy: { title: 'asc' },
      });
      expect(result.data).toEqual(mockProducts);
      expect(result.meta.itemCount).toBe(1);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and its images', async () => {
      const productId = 'prod123';
      const userId = 'user123';
      const mockProduct = {
        id: productId,
        sellerId: userId,
        productImages: [{ url: 'http://image.url', publicId: 'img1' }],
      };

      prisma.products.findUnique.mockResolvedValue(mockProduct);
      prisma.products.delete.mockResolvedValue(mockProduct);
      cloudinary.deleteImages.mockResolvedValue({});

      const result = await service.deleteProduct(productId, userId);

      expect(prisma.products.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
        include: { productImages: true },
      });
      expect(prisma.products.delete).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(cloudinary.deleteImages).toHaveBeenCalledWith(['img1']);
      expect(result).toEqual({
        success: true,
        message: 'Product deleted successfully',
      });
    });

    it('should throw ForbiddenException if user is not the seller', async () => {
      prisma.products.findUnique.mockResolvedValue({
        id: 'prod123',
        sellerId: 'otherUser',
        productImages: [],
      });

      await expect(service.deleteProduct('prod123', 'user123')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product with new images and attributes', async () => {
      const dto = {
        title: 'Updated Product',
        categoryId: 'cat123',
        attributes: [{ key: 'Color', value: 'Blue' }],
        imagesToDelete: ['img1'],
      };
      const productId = 'prod123';
      const userId = 'user123';
      const files = [{ filename: 'new_image.jpg' }] as Express.Multer.File[];
      const mockProduct = {
        id: productId,
        sellerId: userId,
        categoryId: 'cat123',
        productImages: [{ url: 'http://old.url', publicId: 'img1' }],
      };
      const mockAttributes = [
        {
          id: 'attr1',
          name: 'Color',
          attributeOptions: [
            { optionValueId: 'opt1', optionValue: { value: 'Blue' } },
          ],
        },
      ];
      const mockUploadedImages = [{ url: 'http://new.url', publicId: 'img2' }];
      const mockUpdatedProduct = {
        id: productId,
        title: 'Updated Product',
        category: { name: 'Electronics' },
        productImages: [{ url: 'http://new.url', publicId: 'img2' }],
        productAttributes: [
          { attribute: { name: 'Color' }, optionValue: { value: 'Blue' } },
        ],
      };

      prisma.products.findUnique.mockResolvedValue(mockProduct);
      prisma.categories.findUnique.mockResolvedValue({ id: 'cat123' });
      prisma.attributes.findMany.mockResolvedValue(mockAttributes);
      cloudinary.uploadImages.mockResolvedValue(mockUploadedImages);
      prisma.$transaction.mockImplementation(async (callback) =>
        callback(prisma),
      );
      prisma.productImages.deleteMany.mockResolvedValue({ count: 1 });
      prisma.productImages.createMany.mockResolvedValue({ count: 1 });
      prisma.products.update.mockResolvedValue(mockUpdatedProduct);
      cloudinary.deleteImages.mockResolvedValue({});

      const result = await service.updateProduct(dto, productId, userId, files);

      expect(prisma.products.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: expect.objectContaining({
          title: 'Updated Product',
          categoryId: 'cat123',
          productAttributes: {
            deleteMany: {},
            createMany: {
              data: [{ attributeId: 'attr1', optionValueId: 'opt1' }],
            },
          },
        }),
        include: expect.any(Object),
      });
      expect(cloudinary.deleteImages).toHaveBeenCalledWith(['img1']);
      expect(result).toEqual({
        id: productId,
        title: 'Updated Product',
        category: 'Electronics',
        productImages: [{ url: 'http://new.url', publicId: 'img2' }],
        productAttributes: [{ key: 'Color', value: 'Blue' }],
      });
    });

    it('should throw BadRequestException if category changes without attributes', async () => {
      const dto = { categoryId: 'c24' };
      const productId = 'prod123';
      const userId = 'user123';
      prisma.products.findUnique.mockResolvedValue({
        id: productId,
        sellerId: userId,
        categoryId: 'oldCat',
        productImages: [],
      });

      await expect(
        service.updateProduct(dto, productId, userId, []),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
