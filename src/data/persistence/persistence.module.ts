import "reflect-metadata";

import { DataSource, InitializedRelationError } from "typeorm";
import { User } from "./entities/User";
import { Role } from "./entities/Role";
import { UserRepository } from "./repositories/user.repository";
import { RoleRepository } from "./repositories/role.repository";
import { settingUpEnvironment } from "../../config/server.config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PORT) ?? 5432,
  username: process.env.USERNAME ?? "postgres",
  password: process.env.PASSWORD ?? "postgres",
  database: process.env.DATABASE ?? "mydatabase",
  synchronize: false,
  logging: false,
  entities: [User, Role],
  migrations: ["src/data/persistence/migrations/**/*.ts"],
  subscribers: ["src/data/persistence/subscribers/**/*.ts"],
});

const initializeDependencies = async () => {
  try {
    // Establece la conexion a la base de datos
    await settingUpEnvironment();
    console.log("modulo datos: " + process.env.HOST);
    await AppDataSource.initialize();
    console.log("Conexion a la base de datos establecida");
  } catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
    process.exit(1);
  }
};

const closeDependencies = async () => {
  try {
    await AppDataSource.destroy();
    console.log("Conexion a la base de datos cerrada");
  } catch (error) {
    console.error("Error al cerrar la conexion a la base de datos: ", error);
    console.log(error);
  }
};

let userRepository = new UserRepository(AppDataSource);
let roleRepository = new RoleRepository(AppDataSource);

export {
  AppDataSource,
  initializeDependencies,
  closeDependencies,
  userRepository,
  roleRepository,
};
