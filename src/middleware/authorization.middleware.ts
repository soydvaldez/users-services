import { NextFunction, Request, Response } from "express";
import micromatch from "micromatch";
import { log } from "console";
import { UserAuthenticationService } from "../services/userauth.service";

type Role = "Admin" | "Editor" | "User" | "Viewer";

export class UserAutorizationMiddleware {
  permissions: Record<Role, string[]> = {
    Admin: ["/**"],
    Editor: ["/users/edit/**", "/roles/**"],
    User: ["/profile", "/dashboard"],
    Viewer: ["/users", "/roles", "/users/{id}"],
  };

  constructor(
    private readonly userAuthenticationService: UserAuthenticationService
  ) {}

  isAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const userRequest = req.user;

    if (!userRequest?.role) {
      let error: string = "Access Denied";
      let message: string = `You do not have the necessary permissions to access this resource. If you believe this is an error, please contact the system Administrator.`;
      return next(new Error(message));
    }

    const roleName = userRequest.role.name as Role;
    const allowRoutes = this.permissions[roleName];

    const isAuthorized = allowRoutes.some((pattern) => {
      return micromatch.isMatch(req.baseUrl, pattern);
    });

    if (!isAuthorized) {
      let authError = new Error();
      authError.name = `Access Denied`;
      authError.message = "You aren't authorized";
      return next(authError);
    }
    log("You are authorized! continue: ", req.baseUrl);
    next();
  };
}