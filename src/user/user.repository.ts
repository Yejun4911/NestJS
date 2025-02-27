import { Injectable } from "@nestjs/common";
import { User } from "./entity/User.entity";
import { DataSource, Repository } from "typeorm";
import { RegisterDto } from "./dto/user.dto";
import { CustomErrorException } from "../common/exception/custom-error.exception";
import { ErrorCode } from "../common/enums/error-codes.enum";
import { ErrorMessage } from "../common/enums/error-messages.enum";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(registerDto: RegisterDto): Promise<void> {
    await this.save(registerDto);
  }
  async existEmail(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      new CustomErrorException(
        ErrorCode.USER_NOT_FOUND,
        ErrorMessage.USER_NOT_FOUND
      );
    }
    return user;
  }
}
