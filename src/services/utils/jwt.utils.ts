import jwt from "jsonwebtoken";
import { AUTH } from "../../config/env_setup";

interface userInput {
  email: string;
  password: string;
}

export class JWTUtils {
  constructor() {}

  static async signToken(user: userInput) {
    return jwt.sign(user, AUTH.jwt_secret_key);
  }
}
