import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../enums/error-codes.enum"; // ErrorCode enum
import { ErrorMessage } from "../enums/error-messages.enum"; // ErrorMessage enum

export class CustomErrorException extends HttpException {
  constructor(errorCode: ErrorCode, message: ErrorMessage) {
    super(
      {
        errorCode,
        message,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
