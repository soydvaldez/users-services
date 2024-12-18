import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserRepository } from "./repositories/user.repository";
import { RoleRepository } from "./repositories/role.repository";
import { initizalizeDatabase } from "./config/datasource";
import { DB_CONFIG } from "./config/datasource";

let AppDataSource: DataSource | null = null;
let userRepository: UserRepository | null = null;
let roleRepository: RoleRepository | null = null;

const repositoryMap = new Map<string, any>();

async function getRepositories() {
  if (!AppDataSource || !AppDataSource.isInitialized) {
    throw new Error("DataSource no está inicializado.");
  }

  if (!repositoryMap.has("UserRepository")) {
    userRepository = new UserRepository(AppDataSource.getRepository("User"));
    repositoryMap.set("UserRepository", userRepository);
  }

  if (!repositoryMap.has("RoleRepository")) {
    roleRepository = new RoleRepository(AppDataSource.getRepository("Role"));
    repositoryMap.set("RoleRepository", roleRepository);
  }
}

const initializeDependencies = async (DB_CONFIG: DB_CONFIG) => {
  try {
    // Establece la conexion a la base de datos
    if (!AppDataSource) {
      AppDataSource = initizalizeDatabase(DB_CONFIG);
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      await getRepositories();
      console.log(
        "Database initializated! " + "Repositories initializated: [USER, ROLES]"
      );
    }
  } catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
    process.exit(1);
  }
};

export function getRepository(repositoryName: string) {
  if (repositoryMap.has(repositoryName)) {
    return repositoryMap.get(repositoryName);
  }
  throw new Error("Repository not exists");
}

const closeDependencies = async () => {
  try {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      AppDataSource = null;
      userRepository = null;
      roleRepository = null;
      console.log("Conexion a la base de datos cerrada");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error al cerrar la conexion a la base de datos: ", error);
    console.log(error);
  }
};

export { AppDataSource, initializeDependencies, closeDependencies };
