import { NextFunction, Request, Response } from "express";
import micromatch from "micromatch";
import { log } from "console";
import { AuthenticationService } from "../services/auth.service";

type Role = "Admin" | "Editor" | "User" | "Viewer" | "Anonymous";

export class UserAutorizationMiddleware {
  private baseUrl = "/api/v1";
  permissions: Record<Role, string[]> = {
    Anonymous: ["/login", "/register"],
    Admin: ["/**"],
    Editor: ["/users/edit/**", "/roles/edit/**"],
    User: ["/profile", "/dashboard"],
    Viewer: ["/users", "/roles", "/users/{id}"],
  };

  constructor(private readonly authenticationService: AuthenticationService) {}

  isAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const userRequest = req.user;

    // Si las rutas son: /login, /register dar acceso.
    if (
      req.path === `${this.baseUrl}/login` ||
      req.path === `${this.baseUrl}/register`
    ) {
      console.log("Access Granted anonymous user");
      return next();
    }

    if (!userRequest?.role) {
      let error: string = "Access Denied";
      let message: string = `You do not have the necessary permissions to access this resource. If you believe this is an error, please contact the system Administrator.`;
      return next(new Error(message));
    }

    const roleName = userRequest.role.name as Role;
    const allowRoutes = this.permissions[roleName];

    const isAuthorized = allowRoutes.some((pattern) => {
      return micromatch.isMatch(req.path, this.baseUrl + pattern);
    });

    if (!isAuthorized) {
      let authError = new Error();
      authError.name = `Access Denied`;
      authError.message = "You aren't authorized";
      return next(authError);
    }

    const email = userRequest.email.trim() ? userRequest.email : "no-content";

    log(
      `You are authorized! email: ${email} role: ${roleName} route: ${req.path}`
    );
    next();
  };
}
