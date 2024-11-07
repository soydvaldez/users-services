import { UserDtoMapper } from "../adapters/controllers/user.dto.mapper";
import { UserRepository } from "../data/persistence/repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    const userBussinesList = await this.userRepository.getAll();
    return UserDtoMapper.mapListToControllerModel(userBussinesList);
  }
}
