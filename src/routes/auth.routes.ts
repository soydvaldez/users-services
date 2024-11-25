import { Router } from "express";
import { validationMiddleware } from "../controllers/middlewares/validators/validation.middleware";
import { LoginDTO } from "../controllers/models/login.requestDTO";
import { RegisterUserDTO } from "../controllers/models/register.userDTO";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  private authRouter = Router();

  constructor(private readonly authController: AuthController) {
    this.init();
  }

  init() {
    this.authRouter.post(
      "/login",
      validationMiddleware(LoginDTO),
      this.authController.login
    );

    this.authRouter.post(
      "/register",
      validationMiddleware(RegisterUserDTO),
      this.authController.register
    );
  }

  getRoutes() {
    return this.authRouter;
  }
}
