import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as RuntimeException).message || 'Internal Error';
    const errors =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(exception, 'all errors');
    // express .json()
    // fastify .send()
    response.status(status || 500).send({
      code: status,
      message,
      ...(errors && errors !== message && { errors }),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
