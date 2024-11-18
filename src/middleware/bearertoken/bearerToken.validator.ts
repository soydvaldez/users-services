import { Request, Response, NextFunction } from "express";
import { JWTUtils, UserPayload } from "../../services/utils/jwt.utils";
import { AuthenticationService } from "../../services/auth.service";
import { JwtPayload } from "jsonwebtoken";
import { roleBasedRoutes, RoleType } from "../utils";
import micromatch from "micromatch";

const autenticacion: string = "bearer-token";
const baseURL = "/api/v1";

// Mover esta logica a la capa de negocio

export class BearerTokenValidator {
  constructor(private readonly authenticationService: AuthenticationService) {}

  private isAPublicRoute = (req: Request, next: NextFunction) => {
    return (
      req.path === `${baseURL}/login` || req.path === `${baseURL}/register`
    );
  };

  verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (this.isAPublicRoute(req, next)) {
        console.log("Access Granted. Anonymous user from: " + req.ip);
        return next();
      }

      const bearerToken = this.extractBearerToken(req);
      const decodedToken: JwtPayload = JWTUtils.verify(bearerToken);
      const authorizePath = req.path;
      this.validateAutorization(authorizePath, decodedToken);
      console.log(
        "Access Granted. Anonymous user from: " +
          req.ip +
          " to: " +
          authorizePath
      );
      return next();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error); // verdadero error
        // JsonWebTokenError || TokenExpiredError || JsonWebTokenMissing
        return next(error);
      }
    }
  };

  private validateAutorization(authorizePath: string, token: JwtPayload) {
    const user = token.user as UserPayload;

    if (!user.role) {
      throw new Error("Role User is missing!");
    }

    const allowRoutesByRole = roleBasedRoutes[user.role as RoleType];

    const isAuthorized = allowRoutesByRole.some((path) => {
      return micromatch.isMatch(authorizePath, baseURL + path);
    });

    if (!isAuthorized) {
      // throw new AuthorizationError("User unauthorized for server resource");
      throw new Error("Unauthorized");
    }

    console.log("You are authorized. Continue to: " + authorizePath);
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
