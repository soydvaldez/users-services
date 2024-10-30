import { DataSource } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Role } from "../entities/Role";

export class RoleRepository {
  // private datasourceInitialized: Promise<DataSource>;
  private static instance: RoleRepository;

  constructor() {
    // this.datasourceInitialized = AppDataSource.initialize();
  }

  private async ensureInitialized() {
    try {
      // const response = await this.datasourceInitialized;
      // console.log(response);
      // console.log("Base de datos inicializada");
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
      throw error; // Propagar el error
    }
  }

  async getAllRoles(): Promise<Role[]> {
    await this.ensureInitialized();

    try {
      const roles: Role[] = await AppDataSource.manager.find(Role);
      // console.log("Todos los roles recuperados:", roles);
      return roles;
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }

  // Método para obtener la instancia
  public static getInstance(): RoleRepository {
    if (!RoleRepository.instance) {
      RoleRepository.instance = new RoleRepository();
    }
    return RoleRepository.instance;
  }

  // Método para cerrar la conexión
  async closeConnection() {
    try {
      await AppDataSource.destroy(); // Cerrar la conexión
      console.log("Conexión a la base de datos cerrada.");
    } catch (error) {
      console.error("Error al cerrar la conexión:", error);
    }
  }
}
