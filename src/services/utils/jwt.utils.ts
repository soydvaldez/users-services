import jwt from "jsonwebtoken";
import { environmentConfig } from "../../config/settings";

const { AUTH } = environmentConfig();

export class JWTUtils {
  static signToken(user: { email: string; password: string }) {
    return jwt.sign({ username: "", password: "secret password" }, AUTH.secret_key);
  }
}

console.log(JWTUtils.signToken({ email: "", password: "" }));