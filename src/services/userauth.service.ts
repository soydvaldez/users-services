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

    await user.generatePasswordHash(this.hashService);

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
    const isMatchPassword = await userBussines.verifyPasswordHash(
      this.hashService,
      credentials.password
    );

    return isMatchPassword;
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
