import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '~/user/user.service';
import { PrismaService } from '~/prisma/prisma.service';
import { HashingService } from '~/hashing/hashing.service';
import { AuthDto } from '~/auth/dto';

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

const mockPrismaService = {
  users: {
    findUnique: jest.fn(({ where }) => {
      if (where.id) {
        return Promise.resolve(mockUsers.find((user) => user.id === where.id));
      }
      if (where.email) {
        return Promise.resolve(
          mockUsers.find((user) => user.email === where.email),
        );
      }
      return null;
    }),
    findMany: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn(({ data }) => {
      return Promise.resolve({ id: '3', ...data });
    }),
  },
};

const mockHashingService = {
  hash: jest.fn().mockResolvedValue('hashed-password-3'),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: HashingService,
          useValue: mockHashingService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should return all users', async () => {
    const result = await userService.findAll();
    expect(result).toEqual(mockUsers);
    expect(mockPrismaService.users.findMany).toHaveBeenCalledTimes(1);
  });

  it('should return a user by ID', async () => {
    const result = await userService.findById('1');
    expect(result).toEqual(mockUsers[0]);
    expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('should return a user by email', async () => {
    const result = await userService.findByEmail('test1@example.com');
    expect(result).toEqual(mockUsers[0]);
    expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
      where: { email: 'test1@example.com' },
    });
  });

  it('should save a new user', async () => {
    const newUser: AuthDto = {
      email: 'test3@example.com',
      password: 'password3',
      firstName: 'Test',
      lastName: 'User3',
    };

    const result = await userService.save(newUser);

    expect(result).toEqual({
      id: '3',
      email: 'test3@example.com',
      hashedPassword: 'hashed-password-3',
      firstName: 'Test',
      lastName: 'User3',
    });

    expect(mockHashingService.hash).toHaveBeenCalledWith(newUser.password, 10);
    expect(mockPrismaService.users.create).toHaveBeenCalledWith({
      data: {
        email: 'test3@example.com',
        hashedPassword: 'hashed-password-3',
        firstName: 'Test',
        lastName: 'User3',
      },
    });
  });
});
