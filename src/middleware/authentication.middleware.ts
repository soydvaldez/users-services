import { NextFunction, Request, Response } from "express";
import { AuthRequestBody } from "../interface/auth.requestbody";
import { AuthUserDTO } from "../controllers/models/auth.userDTO";
import { Role } from "../data/persistence/entities/Role";
import { AuthenticationService } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: UserFindResult; // Define la propiedad 'user' en la Request
      authUserDTO: AuthUserDTO; // Define la propiedad 'user' en la Request
    }
  }
}

type UserFindResult = {
  email: string;
  password: string;
  role: Role;
};

export class UserAuthenticationMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {}

  isAuthentication = async (
    req: Request<{}, {}, AuthRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    let authUserDTO: AuthUserDTO = req.body;
    const { email, password } = authUserDTO;

    if (!email && !password) {
      // Eres un usuario anonimo
      req.user = {
        email: "",
        password: "",
        role: {
          name: "Anonymous",
        },
      };
      return next();
    }

    if (!email || !password) {
      return next(new Error("Email or password are missing"));
    }

    const userFindedByEmail: UserFindResult =
      await this.authenticationService.findByEmail(email);

    if (!userFindedByEmail) {
      let errorAuth = new Error();
      errorAuth.name = "UserNotFound";
      errorAuth.message = "Failed to get users by email";
      return next(errorAuth);
    }

    const credentials: { email: string; password: string } = {
      email,
      password,
    };

    if (!(await this.validateUserIdentity(credentials))) {
      let errorAuth = new Error();
      errorAuth.name = "AuthenticationError";
      errorAuth.message = "The email or password are invalid";
      return next(errorAuth);
    }

    req.user = userFindedByEmail;
    next();
  };

  private async validateUserIdentity(credentials: {
    email: string;
    password: string;
  }) {
    const isPasswordValid =
      await this.authenticationService.validateUserIdentity(credentials);
    return isPasswordValid;
  }
}
