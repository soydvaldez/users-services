import { UserDtoMapper } from "../adapters/controllers/user.dto.mapper";
import { UserEntityMapper } from "../adapters/data/user.entity.mapper";
import { RegisterUserDTO } from "../controllers/models/register.userDTO";
import { UserUpdateDTO } from "../controllers/models/update.userDTO";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { Roles } from "../middleware/utils";
import { UserRole } from "../utils";
import { NewUser } from "./models/newuser";
import { User } from "./models/user.model";
import { PasswordUtils } from "./utils/password.utils";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  // Pon como opcional que reciba parametros o queries
  async getAll() {
    // Aqui puede tomar decisiones:
    const users: User[] = UserEntityMapper.mapListToBusinessModel(
      await this.userRepository.getAll()
    );
    users.sort((a, b) => a.getId() - b.getId());
    return UserDtoMapper.mapListToControllerModel(users);
  }

  // Puedes crear una query personalizada
  async getActiveUsers() {
    return await this.userRepository.getActiveUsers();
  }

  async getById(id: number) {
    const user: User = await this.userRepository.getById(id);
    return UserDtoMapper.toModelController(user);
  }

  async create(registerUserDTO: RegisterUserDTO) {
    try {
      const createUser = await this.createNewUser(registerUserDTO);
      return this.userRepository.save(
        UserEntityMapper.newUserToEntity(createUser)
      );
    } catch (error) {
      throw error;
    }
  }

  private async createNewUser(registerUserDTO: RegisterUserDTO) {
    const newUser = new NewUser();
    newUser.setFirstName(registerUserDTO.firstName);
    newUser.setLastName(registerUserDTO.lastName);
    newUser.setEmail(registerUserDTO.email);
    await newUser.setPassword(registerUserDTO.password);
    newUser.setRolId(registerUserDTO.role);
    return newUser;
  }

  async delete(id: number) {
    const rowAffected = await this.userRepository.delete(id);
    return rowAffected;
  }

  async update(userId: number, userUpdateDTO: UserUpdateDTO) {
    const updateUser = await this.createNewUser(userUpdateDTO);
    return this.userRepository.update(userId, updateUser);
  }

  public async hashedPassword(plainPassword: string) {
    return await PasswordUtils.generateHashed(plainPassword);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  updateRole(userId: number, role: UserRole) {
    const roleIdToUpdate: number = Number(UserRole[role]);
    return this.userRepository.updateRole(userId, roleIdToUpdate);
  }
}
