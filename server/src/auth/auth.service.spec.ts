import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '~/user/user.service';
import { PrismaService } from '~/prisma/prisma.service';
import { HashingService } from '~/hashing/hashing.service';
import { ConfigService } from '@nestjs/config';
import { Users } from '@prisma/client';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('Auth service', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let userService: UserService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              update: jest.fn(),
              updateMany: jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key) =>
                key === 'AT_SECRET' ? 'at-secret' : 'rt-secret',
              ),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    hashingService = module.get<HashingService>(HashingService);
  });

  describe('signUp', () => {
    it('should throw BadRequestException if user already exists', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue({ id: '1' } as Users);

      await expect(
        authService.signUp({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a new user and return tokens', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest
        .spyOn(userService, 'save')
        .mockResolvedValue({ id: '1', email: 'test@example.com' } as Users);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      jest.spyOn(authService, 'updateRt').mockResolvedValue();

      const tokens = await authService.signUp({
        email: 'test@example.com',
        password: 'password',
      });

      expect(tokens).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      expect(userService.save).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  describe('signIn', () => {
    it('should throw ForbiddenException if user not found', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(
        authService.signIn({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if password does not match', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue({
        id: '1',
        hashedPassword: 'hashedPassword',
      } as Users);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

      await expect(
        authService.signIn({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return tokens on successful sign-in', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue({
        id: '1',
        hashedPassword: 'hashedPassword',
      } as Users);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      jest.spyOn(authService, 'updateRt').mockResolvedValue();

      const tokens = await authService.signIn({
        email: 'test@example.com',
        password: 'password',
      });

      expect(tokens).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      expect(authService.updateRt).toHaveBeenCalledWith('1', 'refreshToken');
    });
  });

  describe('logout', () => {
    it('should clear refresh token', async () => {
      jest
        .spyOn(prismaService.users, 'updateMany')
        .mockResolvedValue({ count: 1 } as any);

      const result = await authService.logout('1');

      expect(prismaService.users.updateMany).toHaveBeenCalledWith({
        where: {
          id: '1',
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });
      expect(result).toBe(true);
    });
  });

  describe('refreshTokens', () => {
    it('should throw ForbiddenException if user or hashedRt is invalid', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await expect(
        authService.refreshTokens('1', 'refreshToken'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return new tokens if refresh token matches', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        hashedRt: 'hashedRefreshToken',
      } as Users);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      jest.spyOn(authService, 'updateRt').mockResolvedValue();

      const tokens = await authService.refreshTokens('1', 'refreshToken');

      expect(tokens).toEqual({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      expect(authService.updateRt).toHaveBeenCalledWith('1', 'newRefreshToken');
    });
  });
});
