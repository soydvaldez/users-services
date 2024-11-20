import { UserRepository } from "../data/persistence/repositories/user.repository";
import { PasswordUtils } from "./utils/password.utils";
import { JWTUtils } from "./utils/jwt.utils";
import { Roles } from "../middleware/utils";

type UserFindResult = {
  email: string;
  password: string;
};

export class LoginService {
  constructor(private readonly userRepository: UserRepository) {}

  // Funcion agrupadora
  async signIn(credentials: { email: string; password: string }) {
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
    const user = await this.userRepository.findByEmail(email);

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
}
