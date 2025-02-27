import { User } from "../user/entity/User.entity";

export interface TokenPayload {
  iat: number; // 토큰 발행 시간
  exp: number; // 토큰 만료 시간
  sub: string; // 사용자 ID (선택적)
  email: string; // 사용자 이메일 (예시)
  user: User;
}
