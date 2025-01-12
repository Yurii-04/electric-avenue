import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '~/user/user.controller';
import { UserService } from '~/user/user.service';

const mockUsers = [
  {
    id: '1',
    email: 'test1@example.com',
    hashedPassword: 'hashed-password-1',
    firstName: 'Test',
    lastName: 'User1',
  },
  {
    id: '2',
    email: 'test2@example.com',
    hashedPassword: 'hashed-password-2',
    firstName: 'Test',
    lastName: 'User2',
  },
];

const mockUserService = {
  findAll: jest.fn().mockResolvedValue(mockUsers),
  findById: jest.fn((id: string) =>
    Promise.resolve(mockUsers.find((user) => user.id === id)),
  ),
  findByEmail: jest.fn((email: string) =>
    Promise.resolve(mockUsers.find((user) => user.email === email)),
  ),
  save: jest.fn((dto) =>
    Promise.resolve({
      id: '3',
      email: dto.email,
      hashedPassword: 'hashed-password-3',
      firstName: dto.firstName,
      lastName: dto.lastName,
    }),
  ),
};

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should return all users', async () => {
    const result = await userController.getAll();
    expect(result).toEqual(mockUsers);
    expect(mockUserService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return a user by ID', async () => {
    const result = await userController.getById('1');
    expect(result).toEqual(mockUsers[0]);
    expect(mockUserService.findById).toHaveBeenCalledWith('1');
  });
});
