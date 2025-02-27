import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ituber",
  password: "tkfkdgo#10",
  database: "ituber-admin",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
};
