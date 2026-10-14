import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. Security Headers via Helmet (with crossOriginResourcePolicy allowing frontend to display uploaded images)
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // 2. Cookie Parser for reading HttpOnly JWT cookies
  app.use((cookieParser as any).default ? (cookieParser as any).default() : (cookieParser as any)());

  // 3. Strict CORS Configuration
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'https://projectm.cloudcrafts.net',
    'https://projectm-28x.pages.dev',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });

  // 4. Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 5. Global API prefix
  app.setGlobalPrefix('api');

  // 6. Serve static uploads directory for images
  const uploadPath = path.resolve(process.cwd(), 'uploads');
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 NestJS Backend running at http://localhost:${port}/api`);
  logger.log(`📁 Uploads served at http://localhost:${port}/uploads/`);
}

bootstrap();
