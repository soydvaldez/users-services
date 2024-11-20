import { UserDtoMapper } from "../adapters/controllers/user.dto.mapper";
import { UserEntityMapper } from "../adapters/data/user.entity.mapper";
import { RegisterUserDTO, Roles } from "../controllers/models/register.userDTO";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { CreateUser } from "./models/user";
import { User } from "./models/user.model";
import { PasswordUtils } from "./utils/password.utils";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    const users: User[] = await this.userRepository.getAll();
    return UserDtoMapper.mapListToControllerModel(users);
  }

  async getById(id: number) {
    const user: User = await this.userRepository.getById(1);
    return UserDtoMapper.toModelController(user);
  }

  async create(registerUserDTO: RegisterUserDTO) {
    try {
      const createUser = await this.adapterUser(registerUserDTO);
      return this.userRepository.save(
        UserEntityMapper.createUserToEntity(createUser)
      );
    } catch (error) {
      throw error;
    }
  }

  private async adapterUser(registerUserDTO: RegisterUserDTO) {
    const createUser = new CreateUser();
    createUser.setFirstName(registerUserDTO.firstName);
    createUser.setLastName(registerUserDTO.lastName);
    createUser.setEmail(registerUserDTO.email);
    await createUser.setPassword(registerUserDTO.password);
    createUser.setRolId(registerUserDTO.role);
    return createUser;
  }

  public async hashedPassword(plainPassword: string) {
    return await PasswordUtils.generateHashed(plainPassword);
  }
}
