import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { ErrorCode } from "../common/enums/error-codes.enum";
import { ErrorMessage } from "../common/enums/error-messages.enum";
import { CustomErrorException } from "../common/exception/custom-error.exception";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { User } from "../user/entity/User.entity";
import { RedisService } from "../redis/redis.service";
import { TokenData } from "./token-data.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email!);
    await this.verifyPassword(password!, user!.password || "");
    return user;
  }
  private async verifyPassword(plainPassword: string, encodePassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      encodePassword
    );
    if (!isPasswordMatching) {
      new CustomErrorException(
        ErrorCode.INVALID_CREDENTIALS,
        ErrorMessage.INVALID_CREDENTIALS
      );
    }
  }
  async login(loginDto: LoginDto): Promise<TokenData | null> {
    const { email } = loginDto;
    const accessToken = await this.generateAccessToken(email);
    const refreshToken = await this.generateRefreshToken(email);
    await this.setRefreshToken(email, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  private async generateAccessToken(email: string) {
    const payload: { email: string } = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET_KEY"),
      expiresIn: this.configService.get("JWT_EXPIRATION"),
    });
  }
  private async generateRefreshToken(email: string) {
    const payload: { email: string } = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_REFRESH_KEY"),
      expiresIn: this.configService.get("JWT_REFRESH_EXPIRATION_TIME"),
    });
  }
  private async setRefreshToken(email: string, refreshToken: string) {
    const ttl = this.configService.get("JWT_REFRESH_EXPIRATION_TIME");
    await this.redisService.setValueToRedis(
      `refreshToken:${email}`,
      refreshToken,
      +ttl
    );
  }
  // public getCookieWithJwtToken(email: string) {
  //   const payload: TokenPayload = { email };
  //   const token = this.jwtService.sign(payload);
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get("JWT_EXPIRATION_TIME")}`;
  // }
  // async createAccessToken(user: User): Promise<string> {
  //   const payload = {
  //     email: user.email,
  //     role: user.role,
  //   };
  //   const access_token = await this.jwtService.signAsync(payload, {
  //     secret: this.configService.get<string>("JWT_SECRET_KEY"),
  //     expiresIn: parseInt(
  //       this.configService.get<string>("JWT_EXPIRATION_TIME")
  //     ),
  //   });
  //
  //   return access_token;
  // }
}
