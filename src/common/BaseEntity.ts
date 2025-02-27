import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// abstract를 사용하는 이유는 이 클래스만 사용하지 않기 떄문에
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @UpdateDateColumn()
    updatedAt: Date;

  @CreateDateColumn()
    createdAt: Date;
}
