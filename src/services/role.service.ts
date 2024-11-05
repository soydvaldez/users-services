import { RoleRepository } from "../data/persistence/repositories/role.repository";

export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles() {
    return await this.roleRepository.getAllRoles();
  }
}
