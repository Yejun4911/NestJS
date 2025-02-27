import { Column, Entity } from "typeorm";
import { Role } from "../enums/role.enum";
import { BaseEntity } from "../../common/BaseEntity";

export type UserDocument = User & Document;

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name?: string;
  @Column()
  email?: string;
  @Column()
  password?: string;
  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role?: string;
}
