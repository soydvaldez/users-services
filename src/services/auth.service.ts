import { RegisterUserDTO } from "../controllers/models/register.userDTO";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { NewUser } from "../interface/user.interface";
import { HashService } from "./utils/hash.service";
import { User } from "./models/user.model";
import { Role } from "../data/persistence/entities/Role";

// Responsabilidad mediadora capa

type UserFindResult = {
  email: string;
  password: string;
  role: Role;
};

export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async register(registerUserDTO: RegisterUserDTO) {
    let user: User = await this.createUser(registerUserDTO);

    // Es el contrato que se debe de cumplir para interactuar con la capa de datos
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

  /**
   *
   * @param credentials email and plain password
   * @returns isMatchPassword boolean
   */
  //
  async validateUserIdentity(credentials: { email: string; password: string }) {
    const findUser: {
      email: string;
      password: string;
    } = await this.findByEmail(credentials.email);

    const userBussines = this.createUserLogin(findUser);

    return HashService.compareHashPassword(
      credentials.password,
      userBussines.getPassword()
    );
  }

  /**
   * Crea un modelo de negocio "User" a partir de un "findUser"
   * @param findUser: { email: string; password: string }
   * @returns User
   */
  createUserLogin(findUser: { email: string; password: string }): User {
    return User.Builder.setEmail(findUser.email)
      .setPassword(findUser.password)
      .build();
  }

  /**
   * Crea un modelo de negocio "User" a partir de un "registerUserDTO"
   * @param registerUserDTO
   * @returns User
   */
  private async createUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    return User.Builder.setfirstName(registerUserDTO.firstName)
      .setlastName(registerUserDTO.lastName)
      .setEmail(registerUserDTO.email)
      .setPassword(
        await HashService.generateHashedPassword(registerUserDTO.password)
      )
      .build();
  }

  findByEmail(email: string): Promise<UserFindResult> {
    return this.userRepository.findByEmail(email);
  }
}
