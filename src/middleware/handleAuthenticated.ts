import { NextFunction, Request, Response } from "express";
import { AuthRequestBody } from "../interface/auth.requestbody";
import { UserService } from "../data/persistence/user.service";

// import { usersResponse } from "../security.js";
// let userService: UserService = UserService.getInstance();

export class RouteSecurity {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async handleAutentication(email: string, password: string) {
    return email === "user1@domain.com" && password === "password_secret";
  }

  async isAutenticated(
    req: Request<{}, {}, AuthRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    let { email, password } = req.body;

    const userFindedByEmail = await this.userService.findByEmail(email);

    if (!userFindedByEmail) {
      return next(new Error("El usuario no existe"));
    }

    if (!(await this.handleAutentication(userFindedByEmail.email, password))) {
      return next(new Error("No estás autenticado"));
    }
    next();
  }

  handleAutorization() {
    return true;
  }

  async isAuthorized(req: Request, res: Response, next: NextFunction) {
    const isAuthorized = false;
    if (!(await this.handleAutorization())) {
      return next(new Error("No tienes autorizacion sobre el recurso"));
    }
    next();
  }

  errorHandler(
    err: Error,
    req: Request<{}, {}, AuthRequestBody>,
    res: Response<any, any>,
    next: NextFunction
  ) {
    res.status(500).json({ error: err.message });
  }
}
