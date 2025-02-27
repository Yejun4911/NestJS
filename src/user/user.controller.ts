import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterDto } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }
}
