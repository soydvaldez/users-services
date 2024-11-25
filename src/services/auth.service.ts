import { PasswordUtils } from "./utils/password.utils";
import { JWTUtils } from "./utils/jwt.utils";
import { Roles } from "../middleware/utils";
import { LoginDTO } from "../controllers/models/login.requestDTO";
import { RegisterUserDTO } from "../controllers/models/register.userDTO";
import { UserService } from "./user.service";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  // Funcion agrupadora
  async signIn(credentials: LoginDTO) {
    try {
      const { email, password } = credentials;

      if (!email || !password)
        throw new Error("Email and password are required");

      let user = await this.verifyIdentity(credentials);

      const payload = JWTUtils.generatePayload({
        id: user.id,
        email: user.email,
        role: user.role.name as Roles,
        permission: [],
      });

      return await JWTUtils.sign(payload);
    } catch (error) {
      // lanzar excepcion arriba;
      throw error;
    }
  }

  getPermissions() {}

  private async verifyIdentity(credentials: {
    email: string;
    password: string;
  }) {
    const { email, password } = credentials;
    const plainPassword = password;

    // Busca al usuario por email
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error("User not found!");
    }

    // Verifica que la contraseña coincida
    const isPasswordMatching = await PasswordUtils.compareHash(
      plainPassword,
      user.password
    );

    if (!isPasswordMatching) {
      throw new Error("Wrong credentials!");
    }

    // Retorna al usuario autenticado
    return user;
  }

  public async register(registerUserDTO: RegisterUserDTO) {
    const userFinded = await this.userService.findByEmail(
      registerUserDTO.email
    );
    if (userFinded) {
      throw new Error("Email User already exists!");
    }
    return await this.userService.create(registerUserDTO);
  }
}
