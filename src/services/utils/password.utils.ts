import bcrypt from "bcrypt";

export class PasswordUtils {
  static async generateHashed(password: string): Promise<string> {
    let saltRounds = 5;
    return await bcrypt.hash(password, saltRounds);
  }

  static async compareHash(
    plainPassword: string,
    hashPassword: string
  ) {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}
