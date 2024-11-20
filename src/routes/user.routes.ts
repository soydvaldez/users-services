import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "../controllers/users.controller";
import { validationMiddleware } from "../controllers/middlewares/validators/validation.middleware";
import { RegisterUserDTO } from "../controllers/models/register.userDTO";

// request.path: /edit
// request.originalUrl: /users/edit

export class UserRouter {
  private routes = Router();

  constructor(private readonly userController: UserController) {
    this.initRoutes();
  }

  initRoutes() {
    this.routes.get("/", this.userController.getAll);
    this.routes.get("/:id", this.userController.getById);

    this.routes.post(
      "/",
      validationMiddleware(RegisterUserDTO),
      this.userController.create
    );

    this.routes.all("*", (req: Request, res: Response) => {
      return res
        .status(405)
        .json({ message: `Método ${req.method} no permitido en esta ruta` });
    });
  }

  getRoutes() {
    return this.routes;
  }
}
