import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { RegisterDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { CustomErrorException } from "../common/exception/custom-error.exception";
import { ErrorCode } from "../common/enums/error-codes.enum";
import { ErrorMessage } from "../common/enums/error-messages.enum";
import { User } from "./entity/User.entity";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userRepository: UserRepository
  ) {}
  async createUser(registerDto: RegisterDto): Promise<void> {
    const { email, password } = registerDto;
    if (await this.userRepository.existEmail(email)) {
      new CustomErrorException(
        ErrorCode.EMAIL_ALREADY_EXISTS,
        ErrorMessage.EMAIL_ALREADY_EXISTS
      );
    }
    registerDto.password = await this.encodePassword(password);
    await this.userRepository.createUser(registerDto);
    return;
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
  private async encodePassword(password: string) {
    return await bcrypt.hash(password, 15);
  }
}
