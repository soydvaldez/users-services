import { UserRepository } from "../data/persistence/repositories/user.repository";
import { PasswordUtils } from "./utils/password.utils";
import { JWTUtils } from "./utils/jwt.utils";

type UserFindResult = {
  email: string;
  password: string;
};

export class LoginService {
  constructor(private readonly userRepository: UserRepository) {}

  // Funcion agrupadora
  async signIn(credentials: { email: string; password: string }) {
    try {
      const isIdentityVerified = await this.verifyIdentity(credentials);
      if (isIdentityVerified) {
        const payload = JWTUtils.generatePayload();
        return await JWTUtils.sign(payload);
      }
      throw new Error("Wron credentials");
    } catch (error) {
      // lanzar excepcion arriba;
      throw error;
    }
  }

  private async verifyIdentity(credentials: {
    email: string;
    password: string;
  }) {
    const { email, password } = credentials;
    const userFindResult = await this.userRepository.findByEmail(email);
    const passwordHashed = userFindResult.password;
    return await PasswordUtils.compareHashPassword(password, passwordHashed);
  }
}
