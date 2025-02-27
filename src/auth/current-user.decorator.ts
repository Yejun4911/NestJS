import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../user/entity/User.entity";

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
