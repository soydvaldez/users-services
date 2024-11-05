import { configuration } from "../../../config/settings";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

export interface DB_CONFIG {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export const initizalizeDatabase = (DB_CONFIG: DB_CONFIG) => {
  return new DataSource({
    type: "postgres",
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    synchronize: false,
    logging: false,
    entities: [User, Role],
    migrations: ["src/data/persistence/migrations/**/*.ts"],
    subscribers: ["src/data/persistence/subscribers/**/*.ts"],
  });
};
