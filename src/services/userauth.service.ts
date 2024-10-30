import { RegisterUserDTO } from "../controllers/models/register.userDTO";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { NewUser } from "../interface/user.interface";
import { HashService } from "./hash.service";
import { User } from "./models/user.model";
import { Role } from "../data/persistence/entities/Role";

// Responsabilidad mediadora capa

type UserFindResult = {
  email: string;
  password: string;
  role: Role;
};

export class UserAuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) {}

  async register(registerUserDTO: RegisterUserDTO) {
    let user: User = this.createUser(registerUserDTO);

    await user.hashPassword(this.hashService);

    const newUser: NewUser = {
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      password: user.getPassword(),
      isActive: true,
    };
    const users: NewUser[] = [];
    users.push(newUser);
    this.userRepository.createUser(users);
    return user;
  }

  // Delega la responsabilidad a un servicio dedicado a ello:
  // Necesito la password en plano y la hash_password
  async comparePassword(userFindedByEmail: {
    email: string;
    password: string;
  }) {
    const findUser: {
      email: string;
      password: string;
    } = await this.userRepository.findByEmail(userFindedByEmail.email);
    const userBussines = this.createUserSign(findUser);
    const isMatch = await userBussines.compare(this.hashService, "secret");

    return isMatch;
  }

  createUserSign(findUser: { email: string; password: string }) {
    return User.Builder.setEmail(findUser.email)
      .setPassword(findUser.password)
      .build();
  }

  // Método privado para construir el usuario desde el DTO
  private createUser(registerUserDTO: RegisterUserDTO): User {
    return User.Builder.setfirstName(registerUserDTO.firstName)
      .setlastName(registerUserDTO.lastName)
      .setEmail(registerUserDTO.email)
      .setPassword(registerUserDTO.password)
      .build();
  }

  findByEmail(email: string): Promise<UserFindResult> {
    return this.userRepository.findByEmail(email);
  }
}
