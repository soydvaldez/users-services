import bcrypt from "bcrypt";

export class HashService {
  async hash(password: string): Promise<string> {
    let saltRounds = 5;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(hashPassword: string, plainPassword: string) {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}
