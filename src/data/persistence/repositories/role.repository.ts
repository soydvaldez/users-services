import { DataSource, Repository } from "typeorm";
import { Role } from "../entities/Role";

export class RoleRepository {
  // private datasourceInitialized: Promise<DataSource>;
  private roleRepository: Repository<Role>;

  constructor(repository: Repository<Role>) {
    // this.roleRepository = dataSource.getRepository(Role);
    this.roleRepository = repository;
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
      const roles: Role[] = await this.roleRepository.manager.find(Role);
      // console.log("Todos los roles recuperados:", roles);
      return roles;
    } catch (error) {
      console.error("Error al consultar usuarios:", error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }

  async create(roleName: string) {
    try {
      const roleEntity = new Role();
      roleEntity.name = roleName;
      await this.roleRepository.save(roleEntity);
    } catch (error) {
      console.log(error);
    }
  }
}
