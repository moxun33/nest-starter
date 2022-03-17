import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './error/http-exception.filter';
import { AllExceptionFilter } from './error/all-exception.filter';
import { ReportLogger } from './log/ReportLogger';
import { LogInterceptor } from './log/log.interceptor';
import { TransformInterceptor } from './transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

const setupSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('nest service')
    .setDescription('nest')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
async function bootstrap() {
  const reportLogger = new ReportLogger();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
      logger: reportLogger,
    },
  );

  //  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  setupSwagger(app);
  await app.listen(4400);
}

bootstrap();
