import { UserRepository } from "../data/persistence/repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    return await this.userRepository.getAllUsers();
  }
}
