import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy";
import { LocalAuthGuard } from "./guard/local.guard";
import { CurrentUser } from "./current-user.decorator";
import { JwtAuthGuard } from "./guard/jwt.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Get("/reissue")
  @UseGuards(JwtRefreshStrategy)
  reissue(@CurrentUser() email: string) {
    return this.authService.generateRefreshToken(email);
  }
  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() email: string) {
    await this.authService.logout(email);
  }
}
