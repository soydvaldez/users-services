import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "../controllers/users.controller";

// request.path: /edit
// request.originalUrl: /users/edit

export class UserRouter {
  private routes = Router();

  constructor(private readonly userController: UserController) {
    this.initRoutes();
  }

  initRoutes() {
    this.routes.get("/", this.userController.getAll);
    this.routes.post(
      "/edit",
      (req: Request, res: Response, next: NextFunction) => {
        return this.userController.edit(req, res, next);
      }
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
