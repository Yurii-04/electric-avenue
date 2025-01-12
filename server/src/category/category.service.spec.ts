import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '~/prisma/prisma.service';

const mockCategories = [
  {
    id: 1,
    name: 'Computer components',
    parentId: null,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/root-catgories/ajayk9zwsbmdkmnza1fd.svg',
    isGroup: false,
  },
  {
    id: 2,
    name: 'Computer & Laptops',
    parentId: null,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933504/categories/root-catgories/zbo7c5k5cp4ufvz8ct80.svg',
    isGroup: false,
  },
  {
    id: 3,
    name: 'Monitors & TVs',
    parentId: null,
    icon: 'https://res.cloudinary.com/dohpr9r3z/image/upload/v1735933505/categories/root-catgories/g7m2sihmcs0wjq2ogiyp.svg',
    isGroup: false,
  },
];

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: {
            categories: {
              findMany: jest.fn().mockResolvedValue(mockCategories),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return all categories', async () => {
    const result = await service.getAllCategories();
    expect(result).toEqual(mockCategories);
    expect(prismaService.categories.findMany).toHaveBeenCalledTimes(1);
  });
});
