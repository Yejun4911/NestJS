import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/jwt.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
