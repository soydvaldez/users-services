import { RoleRepository } from "../data/persistence/repositories/role.repository";

export class RoleService {
  roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = RoleRepository.getInstance();
  }

  async getAllRoles() {
    return await this.roleRepository.getAllRoles();
  }
}
