import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 예외 응답이 객체일 경우(errorCode, message와 같은)
    const errorResponse =
      typeof exceptionResponse === "object"
        ? exceptionResponse
        : { message: exceptionResponse };

    response.status(status).json({
      statusCode: status,
      ...errorResponse,
    });
  }
}
