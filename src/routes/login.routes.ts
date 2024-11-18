import { LoginController } from "../controllers/login.controller";
import { Router } from "express";

export class LoginRouter {
  private loginRouter = Router();

  constructor(private readonly loginController: LoginController) {
    this.init();
  }

  init() {
    this.loginRouter.post("/", this.loginController.signIn);
  }

  getRoutes() {
    return this.loginRouter;
  }
}
