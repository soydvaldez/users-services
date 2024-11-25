import { RoleRepository } from "../data/persistence/repositories/role.repository";

export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles() {
    const roles = await this.roleRepository.getAllRoles();
    return roles;
  }

  async create(newRole: string) {
    const isRoleExists = await this.verifyRoleExists(newRole);
    if (isRoleExists) {
      throw new Error("Role already exists!");
    }
    return await this.roleRepository.create(newRole);
  }

  async verifyRoleExists(newRole: string): Promise<boolean> {
    // Función para normalizar roles (puede moverse a un archivo utilitario si es necesario)
    function normalizedRole(inputRole: string): string {
      return inputRole
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, ""); // Remover caracteres no alfanuméricos
    }
    try {
      let isRoleExists: boolean = false;

      const roles = await this.roleRepository.getAllRoles();
      const normalizedRoles = roles.map((role) => normalizedRole(role.name));
      const normalizedNewRole = normalizedRole(newRole);

      isRoleExists = normalizedRoles.includes(normalizedNewRole);

      return isRoleExists;
    } catch (error) {
      console.error("Error al verificar el rol:", error);
      throw error; // Relanzar el error para que sea manejado en un nivel superior
    }
  }
}
