import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '~/auth/auth.controller';
import { AuthService } from '~/auth/auth.service';
import { AuthDto } from '~/auth/dto';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            logout: jest.fn(),
            refreshTokens: jest.fn(),
            addRtToResponse: jest.fn(),
            removeRtFromResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should sign up a user and return access token', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'password' };
      const mockResponse = { accessToken: 'accessToken' };
      const res = { cookie: jest.fn() } as unknown as Response;

      jest.spyOn(authService, 'signUp').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      jest.spyOn(authService, 'addRtToResponse').mockImplementation();

      const result = await authController.signUp(dto, res);

      expect(result).toEqual(mockResponse);
      expect(authService.signUp).toHaveBeenCalledWith(dto);
      expect(authService.addRtToResponse).toHaveBeenCalledWith(
        res,
        'refreshToken',
      );
    });
  });

  describe('signIn', () => {
    it('should sign in a user and return access token', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'password' };
      const mockResponse = { accessToken: 'accessToken' };
      const res = { cookie: jest.fn() } as unknown as Response;

      jest.spyOn(authService, 'signIn').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      jest.spyOn(authService, 'addRtToResponse').mockImplementation();

      const result = await authController.signIn(dto, res);

      expect(result).toEqual(mockResponse);
      expect(authService.signIn).toHaveBeenCalledWith(dto);
      expect(authService.addRtToResponse).toHaveBeenCalledWith(
        res,
        'refreshToken',
      );
    });
  });

  describe('logout', () => {
    it('should log out a user and return true', async () => {
      const res = { clearCookie: jest.fn() } as unknown as Response;

      jest.spyOn(authService, 'logout').mockResolvedValue(true);
      jest.spyOn(authService, 'removeRtFromResponse').mockImplementation();

      const result = await authController.logout('1', res);

      expect(result).toBe(true);
      expect(authService.logout).toHaveBeenCalledWith('1');
      expect(authService.removeRtFromResponse).toHaveBeenCalledWith(res);
    });
  });

  describe('refresh', () => {
    it('should refresh tokens and return new access token', async () => {
      const req = { cookies: { refreshToken: 'oldRefreshToken' } } as any;
      const res = { cookie: jest.fn() } as unknown as Response;

      jest.spyOn(authService, 'refreshTokens').mockResolvedValue({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      jest.spyOn(authService, 'addRtToResponse').mockImplementation();

      const result = await authController.refresh('1', req, res);

      expect(result).toEqual({ accessToken: 'newAccessToken' });
      expect(authService.refreshTokens).toHaveBeenCalledWith(
        '1',
        'oldRefreshToken',
      );
      expect(authService.addRtToResponse).toHaveBeenCalledWith(
        res,
        'newRefreshToken',
      );
    });
  });
});
