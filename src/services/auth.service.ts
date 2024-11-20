import { RegisterUserDTO } from "../controllers/models/register.userDTO";
import { Role } from "../data/persistence/entities/Role";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { NewUser } from "../interface/user.interface";
import { User } from "./models/user.model";
import { PasswordUtils } from "./utils/password.utils";

// Responsabilidad mediadora capa

//Servicio para manejar la autenticacion del usuario

type UserFindResult = {
  email: string;
  password: string;
  role: Role;
};

export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async validateUserIdentity(credentials: { email: string; password: string }) {
    const findUser: {
      email: string;
      password: string;
    } = await this.findByEmail(credentials.email);

    const userBussines = this.createUserLogin(findUser);

    return PasswordUtils.compareHash(
      credentials.password,
      userBussines.getPassword()
    );
  }

  createUserLogin(findUser: { email: string; password: string }): User {
    return User.Builder.setEmail(findUser.email)
      .setPassword(findUser.password)
      .build();
  }

  private async createUser(registerUserDTO: RegisterUserDTO): Promise<User> {
    return User.Builder.setfirstName(registerUserDTO.firstName)
      .setlastName(registerUserDTO.lastName)
      .setEmail(registerUserDTO.email)
      .setPassword(
        await PasswordUtils.generateHashed(registerUserDTO.password)
      )
      .build();
  }

  findByEmail(email: string): Promise<UserFindResult> {
    return this.userRepository.findByEmail(email);
  }
}
