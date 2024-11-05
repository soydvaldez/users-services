import bcrypt from "bcrypt";

export class HashUtils {
  static async generateHashedPassword(password: string): Promise<string> {
    let saltRounds = 5;
    return await bcrypt.hash(password, saltRounds);
  }

  static async compareHashPassword(
    plainPassword: string,
    hashPassword: string
  ) {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}
