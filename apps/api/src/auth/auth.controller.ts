import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDto } from '@projectm/shared';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  private clearCookies(res: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('access_token', { path: '/', httpOnly: true, secure: isProd, sameSite: 'lax' });
    res.clearCookie('refresh_token', { path: '/', httpOnly: true, secure: isProd, sameSite: 'lax' });
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Anti brute-force: max 5 attempts per minute
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    this.setCookies(res, result.tokens.accessToken, result.tokens.refreshToken);

    return {
      user: result.user,
      accessToken: result.tokens.accessToken,
      message: 'Logged in successfully',
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.['refresh_token'] || req.body?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const refreshSecret =
        process.env.JWT_REFRESH_SECRET || 'projectm-super-secure-refresh-token-secret-2026-prod-ready';
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: refreshSecret,
      });

      const result = await this.authService.refreshTokens(payload.sub, refreshToken);
      this.setCookies(res, result.tokens.accessToken, result.tokens.refreshToken);

      return {
        user: result.user,
        accessToken: result.tokens.accessToken,
        message: 'Token refreshed successfully',
      };
    } catch (e) {
      this.clearCookies(res);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (user?.id) {
      await this.authService.logout(user.id);
    }
    this.clearCookies(res);
    return { success: true, message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: UserDto) {
    return { user };
  }
}
