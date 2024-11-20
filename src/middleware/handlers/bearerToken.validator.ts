import { Request, Response, NextFunction } from "express";
import { JWTUtils, UserPayload } from "../../services/utils/jwt.utils";
import { AuthenticationService } from "../../services/auth.service";
import { JwtPayload } from "jsonwebtoken";
import { roleBasedRoutes, Roles, RoleType } from "../utils";
import micromatch from "micromatch";
import { AppDataSource } from "../../data/persistence/persistence.module";

const autenticacion: string = "bearer-token";
const baseURL = "/api/v1";

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

// Mover esta logica a la capa de negocio

export class BearerTokenValidator {
  constructor(private readonly authenticationService: AuthenticationService) {}

  private isAPublicRoute = (path: string) => {
    return path === `${baseURL}/login` || path === `${baseURL}/register`;
  };

  verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const path = req.path;
      if (this.isAPublicRoute(path)) {
        console.log("Access Granted. Anonymous user from: " + req.ip);
        return next();
      }

      const bearerToken = this.extractBearerToken(req);
      const decodedToken: JwtPayload = JWTUtils.verify(bearerToken);

      const user = decodedToken.user as UserPayload;
      const { email, role } = user;
      const isAuthorized = this.hasAuthorize(path, user);

      if (!isAuthorized) {
        // throw new AuthorizationError("User unauthorized for server resource");
        throw new Error("Unauthorized");
      }

      console.log(
        `Access Granted ${email} Role [${role}]. Resource ${path}`
      );
      return next();
    } catch (error) {
      if (error instanceof Error) {
        // console.log(error); // verdadero error
        // JsonWebTokenError || TokenExpiredError || JsonWebTokenMissing
        return next(error);
      }
    }
  };

  private hasAuthorize(authorizePath: string, userPayload: UserPayload) {
    if (!userPayload.role) {
      throw new Error("Role User is missing!");
    }

    const isValidRole = Object.values(Roles).includes(userPayload.role);
    if (!isValidRole) {
      throw new AuthenticationError("Invalid Rol User: " + userPayload.role);
    }

    const allowRoutesByRole = roleBasedRoutes[userPayload.role as RoleType];

    const isAuthorized = allowRoutesByRole.some((path) => {
      return micromatch.isMatch(authorizePath, baseURL + path);
    });

    return isAuthorized;
  }

  private extractBearerToken(req: Request): string {
    const authorization = req.headers["authorization"];
    let splitToken: string[] = [];
    let tokenFormat;
    let bearerToken;

    if (!authorization) {
      throw new Error("JsonWebTokenMissing");
    }

    if (authorization && typeof authorization === "string") {
      splitToken = authorization.split(" ");
      tokenFormat = splitToken[0];
      bearerToken = splitToken[1];
    }

    if (!(tokenFormat === "Bearer")) {
      throw new Error(
        "Format token not supported. Token Must be a 'Bearer Token'"
      );
    }

    if (!bearerToken) {
      throw new Error(
        "Token value is not present. You must be set a token value"
      );
    }

    return bearerToken;
  }
}
