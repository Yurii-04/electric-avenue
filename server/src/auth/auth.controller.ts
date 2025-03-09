import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '~/auth/auth.service';
import { RegisterDto, LoginDto } from '~/auth/dto';
import { AccessToken } from '~/auth/types';
import { RtGuard } from '~/common/guards';
import { GetCurrentUserId, Public } from '~/common/decorators';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signUp(dto);
    await this.authService.addRtToResponse(res, refreshToken);
    return { accessToken };
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { accessToken, refreshToken } = await this.authService.signIn(dto);
    await this.authService.addRtToResponse(res, refreshToken);
    return { accessToken };
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    const result = await this.authService.logout(userId);
    await this.authService.removeRtFromResponse(res);
    return result;
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(
    @GetCurrentUserId() userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { refreshToken: refreshTokenFromCookies } = req.cookies;
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      userId,
      refreshTokenFromCookies,
    );
    await this.authService.addRtToResponse(res, refreshToken);

    return { accessToken };
  }
}
