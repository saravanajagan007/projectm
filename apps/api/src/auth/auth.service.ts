import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@projectm/shared';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { passwordHash, hashedRefreshToken, ...safeUser } = user;
    return safeUser;
  }

  async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessSecret =
      process.env.JWT_ACCESS_SECRET || 'projectm-super-secure-access-token-secret-2026-prod-ready';
    const refreshSecret =
      process.env.JWT_REFRESH_SECRET || 'projectm-super-secure-refresh-token-secret-2026-prod-ready';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Hash refresh token before persisting to DB for token rotation & revocation safety
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      tokens,
    };
  }

  async refreshTokens(userId: string, incomingRefreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied: Invalid session or token already revoked');
    }

    const refreshTokenMatches = await bcrypt.compare(
      incomingRefreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      // Possible token reuse detected! Invalidate immediately
      await this.usersService.updateRefreshToken(userId, null);
      throw new ForbiddenException('Access Denied: Reused or expired refresh token');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const newHashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.updateRefreshToken(user.id, newHashedRefreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role as UserRole,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      tokens,
    };
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
    return { success: true, message: 'Logged out successfully' };
  }
}
