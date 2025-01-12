import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

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

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAllCategories: jest.fn().mockResolvedValue(mockCategories),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return all categories', async () => {
    const result = await controller.getAllCategories();
    expect(result).toEqual(mockCategories);
    expect(service.getAllCategories).toHaveBeenCalledTimes(1);
  });
});
