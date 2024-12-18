import jwt, { JwtPayload } from "jsonwebtoken";
import { AUTH } from "../../config/env_setup";
import { Roles } from "../../middleware/utils";

type permissionType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export interface UserPayload {
  id: number;
  email: string;
  role: Roles;
  permission: permissionType[];
}

interface Payload {
  exp: number;
  iat: number;
  user: UserPayload;
}

export class JWTUtils {
  constructor() {}

  static async sign(user: Payload) {
    return jwt.sign(user, AUTH.jwt_secret_key);
  }

  static verify(bearerToken: string) {
    return jwt.verify(bearerToken, AUTH.jwt_secret_key) as JwtPayload;
  }

  static generatePayload(userPayload: UserPayload): Payload {
    const issuedAt = Math.floor(Date.now() / 1000) - 30;
    const expirationTime = issuedAt + 60 * 60;

    return {
      iat: issuedAt,
      exp: expirationTime,
      user: {
        id: userPayload.id,
        email: userPayload.email,
        role: userPayload.role,
        permission: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      },
    };
  }
}
