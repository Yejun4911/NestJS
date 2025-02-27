import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../token-payload.interface";
import { AuthService } from "../auth.service";
import { CustomErrorException } from "../../common/exception/custom-error.exception";
import { ErrorCode } from "../../common/enums/error-codes.enum";
import { ErrorMessage } from "../../common/enums/error-messages.enum";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(configService.get<string>("JWT_REFRESH_SECRET")),
    });
  }

  async validate(req: Request, payload: TokenPayload): Promise<string | null> {
    const refreshToken = req.headers["authorization"].split(" ")[1]; // client request의 헤더에서 토큰값 가져오기('Bearer ' 제거)

    const isTokenValid = await this.authService.validateRefreshToken(
      refreshToken,
      payload.email
    );
    if (!isTokenValid) {
      throw new CustomErrorException(
        ErrorCode.INVALID_CREDENTIALS,
        ErrorMessage.INVALID_CREDENTIALS
      );
    }
    return payload.email;
  }
}
