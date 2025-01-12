import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '~/prisma/prisma.service';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from '~/common/dtos';

const mockPrismaService = {
  products: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  categories: {
    findUnique: jest.fn(),
  },
};

const mockCloudinaryService = {
  uploadImages: jest.fn(),
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
    it('should create a product and return it', async () => {
      const dto = {
        title: 'Test Product',
        description: 'Test description',
        categoryId: 1,
        price: '100',
        attributes: [{ attributeId: 1, value: 'black' }],
      };
      const userId = 'user123';
      const files = [{ filename: 'image1.jpg' }] as Express.Multer.File[];

      prisma.categories.findUnique.mockResolvedValue({ id: 'cat123' });
      cloudinary.uploadImages.mockResolvedValue([{ url: 'http://image.url' }]);
      prisma.products.create.mockResolvedValue({ id: 'prod123' });
      prisma.products.update.mockResolvedValue({
        id: 'prod123',
        title: 'Test Product',
      });

      const result = await service.create(dto, userId, files);

      expect(prisma.categories.findUnique).toHaveBeenCalledWith({
        where: { id: dto.categoryId },
      });
      expect(cloudinary.uploadImages).toHaveBeenCalledWith(files);
      expect(prisma.products.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            seller: { connect: { id: userId } },
          }),
        }),
      );
      expect(result).toEqual({ id: 'prod123', title: 'Test Product' });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      const dto = {
        title: 'Test Product',
        description: 'Test description',
        categoryId: 1,
        price: '100',
        attributes: [{ attributeId: 1, value: 'black' }],
      };
      const userId = 'user123';
      const files = [] as Express.Multer.File[];

      prisma.categories.findUnique.mockResolvedValue(null);

      await expect(service.create(dto, userId, files)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if file upload fails', async () => {
      const dto = {
        title: 'Test Product',
        description: 'Test description',
        categoryId: 1,
        price: '100',
        attributes: [{ attributeId: 1, value: 'black' }],
      };
      const userId = 'user123';
      const files = [{ filename: 'image1.jpg' }] as Express.Multer.File[];

      prisma.categories.findUnique.mockResolvedValue({ id: 'cat123' });
      cloudinary.uploadImages.mockRejectedValue(new Error('Invalid file type'));

      await expect(service.create(dto, userId, files)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getById', () => {
    it('should return a product with attributes', async () => {
      const productId = 'prod123';
      prisma.products.findUnique.mockResolvedValue({
        id: productId,
        title: 'Test Product',
        attributeValues: [
          { value: 'Value1', attribute: { name: 'Key1' } },
          { value: 'Value2', attribute: { name: 'Key2' } },
        ],
      });

      const result = await service.getById(productId);

      expect(prisma.products.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: productId } }),
      );
      expect(result).toEqual(
        expect.objectContaining({
          id: productId,
          attributes: [
            { key: 'Key1', value: 'Value1' },
            { key: 'Key2', value: 'Value2' },
          ],
        }),
      );
    });

    it('should throw NotFoundException if product does not exist', async () => {
      const productId = 'invalid';
      prisma.products.findUnique.mockResolvedValue(null);

      await expect(service.getById(productId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return it', async () => {
      const productId = 'prod123';
      const userId = 'user123';

      prisma.products.findUnique.mockResolvedValue({
        id: productId,
        sellerId: userId,
      });
      prisma.products.delete.mockResolvedValue({
        id: productId,
        title: 'Deleted Product',
      });

      const result = await service.deleteProduct(productId, userId);

      expect(prisma.products.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(prisma.products.delete).toHaveBeenCalledWith({
        select: {
          description: true,
          id: true,
          images: true,
          price: true,
          title: true,
        },
        where: {
          id: productId,
        },
      });

      expect(result).toEqual({ id: productId, title: 'Deleted Product' });
    });

    it('should throw ForbiddenException if user is not the seller', async () => {
      const productId = 'prod123';
      const userId = 'user456';

      prisma.products.findUnique.mockResolvedValue({
        id: productId,
        sellerId: 'user123',
      });

      await expect(service.deleteProduct(productId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product and return it', async () => {
      const dto = {
        title: 'Updated Product',
        description: 'Updated description',
        price: '150',
      };
      const productId = 'prod123';
      const userId = 'user123';
      const files = [
        { filename: 'updated_image.jpg' },
      ] as Express.Multer.File[];

      prisma.products.findUnique.mockResolvedValue({
        id: productId,
        sellerId: userId,
      });
      cloudinary.uploadImages.mockResolvedValue([
        { url: 'http://updated.image.url' },
      ]);
      prisma.products.update.mockResolvedValue({
        id: productId,
        title: 'Updated Product',
        price: '150',
      });

      const result = await service.updateProduct(dto, productId, userId, files);

      expect(prisma.products.findUnique).toHaveBeenCalledWith({
        where: { id: productId },
      });
      expect(cloudinary.uploadImages).toHaveBeenCalledWith(files);
      expect(prisma.products.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: productId },
          data: expect.objectContaining({
            title: 'Updated Product',
            price: '150',
          }),
        }),
      );
      expect(result).toEqual({
        id: productId,
        title: 'Updated Product',
        price: '150',
      });
    });

    it('should throw ForbiddenException if user is not the seller', async () => {
      const dto = {
        title: 'Updated Product',
        description: 'Updated description',
        price: '150',
      };
      const productId = 'prod123';
      const userId = 'user456';
      const files = [
        { filename: 'updated_image.jpg' },
      ] as Express.Multer.File[];

      prisma.products.findUnique.mockResolvedValue({
        id: productId,
        sellerId: 'user123',
      });

      await expect(
        service.updateProduct(dto, productId, userId, files),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      const dto = {
        title: 'Updated Product',
        description: 'Updated description',
        price: '150',
      };
      const productId = 'invalid';
      const userId = 'user123';
      const files = [
        { filename: 'updated_image.jpg' },
      ] as Express.Multer.File[];

      prisma.products.findUnique.mockResolvedValue(null);

      await expect(
        service.updateProduct(dto, productId, userId, files),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAll', () => {
    it('should return all products with pagination', async () => {
      const pageOptions = {
        page: 2,
        take: 1,
        orderBy: 'createdAt',
        order: 'desc',
      };
      const pageOptionsDto = plainToInstance(PageOptionsDto, pageOptions);
      const mockProducts = [
        {
          id: 'prod1',
          title: 'Product 1',
          price: '100',
          images: ['http://image1.url'],
        },
        {
          id: 'prod2',
          title: 'Product 2',
          price: '200',
          images: ['http://image2.url'],
        },
      ];
      const itemCount = 2;

      prisma.products.findMany.mockResolvedValue(mockProducts[1]);
      prisma.products.count.mockResolvedValue(itemCount);

      const result = await service.getAll(pageOptionsDto);
      expect(prisma.products.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: pageOptionsDto.skip,
          take: pageOptionsDto.take,
          orderBy: { [pageOptions.orderBy]: pageOptionsDto.order },
        }),
      );
      expect(result.data).toEqual(mockProducts[1]);
      expect(result.meta.itemCount).toBe(itemCount);
    });
  });

  describe('getByCategory', () => {
    it('should return products by category with pagination', async () => {
      const categoryName = 'Electronics';
      const pageOptions = {
        page: 2,
        take: 1,
        orderBy: 'createdAt',
        order: 'desc',
      };
      const pageOptionsDto = plainToInstance(PageOptionsDto, pageOptions);
      const mockProducts = [
        {
          id: 'prod1',
          title: 'Product 1',
          price: '100',
          images: ['http://image1.url'],
        },
        {
          id: 'prod2',
          title: 'Product 2',
          price: '200',
          images: ['http://image2.url'],
        },
      ];
      const itemCount = 2;

      prisma.products.findMany.mockResolvedValue(mockProducts[1]);
      prisma.products.count.mockResolvedValue(itemCount);

      const result = await service.getByCategory(categoryName, pageOptionsDto);

      expect(prisma.products.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            category: { name: { equals: categoryName, mode: 'insensitive' } },
          },
          skip: pageOptionsDto.skip,
          take: pageOptionsDto.take,
          orderBy: { [pageOptions.orderBy]: pageOptionsDto.order },
        }),
      );
      expect(result.data).toEqual(mockProducts[1]);
      expect(result.meta.itemCount).toBe(itemCount);
    });
  });
});
