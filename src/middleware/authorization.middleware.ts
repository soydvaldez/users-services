import { NextFunction, Request, Response } from "express";
import micromatch from "micromatch";
import { IAuthorization } from "./IAuthorization";
import { AuthorizationError, roleBasedRoutes, RoleType, UserAuthorization } from "./utils";

export class BasicAuthorizationMiddleware implements IAuthorization {
  autenticacion: string = "basic-auth";
  private req!: Request;
  private next!: NextFunction;
  private baseUrl: string = "/api/v1";

  constructor() {}

  // Cambiar el nombre a: handleAuthorization
  handleAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.req = req;
    this.next = next;

    if (this.isAPublicRoute()) {
      console.log("Access Granted anonymous user");
      return next();
    }

    try {
      const userToAuthorize = this.validateUser();
      this.isAuthorized(userToAuthorize);
    } catch (error) {
      next(error);
    }
  };

  isAPublicRoute() {
    // Las rutas publicas son: /login, /register dar acceso.
    return (
      this.req.path === `${this.baseUrl}/login` ||
      this.req.path === `${this.baseUrl}/register`
    );
  }

  validateUser() {
    const userRequest = this.req.user;

    if (!userRequest) {
      throw new Error("User not found on request object");
    }

    if (!userRequest?.role) {
      throw new Error("User role is missing");
    }

    return {
      email: userRequest.email,
      password: userRequest.password,
      roleType: userRequest.role.name as RoleType,
    };
  }

  isAuthorized(userAuthorization: UserAuthorization) {
    const allowRoutesByRole = roleBasedRoutes[userAuthorization.roleType];

    const isAuthorized = allowRoutesByRole.some((pattern) => {
      return micromatch.isMatch(this.req.path, this.baseUrl + pattern);
    });

    if (!isAuthorized) {
      throw new AuthorizationError("User unauthorized for server resource");
    }

    console.log(
      `You are authorized! email: ${userAuthorization.email} role: ${userAuthorization.roleType} route: ${this.req.path}`
    );
    this.next();
  }
}
