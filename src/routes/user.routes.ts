import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "../controllers/users.controller";
import { validationMiddleware } from "../controllers/middlewares/validators/validation.middleware";
import { RegisterUserDTO } from "../controllers/models/register.userDTO";

// request.path: /edit
// request.originalUrl: /users/edit

function validateRole(req: Request, res: Response, next: NextFunction) {
  if (!req.body.role) {
    const err = new Error("Role is missing!");
    return res.status(400).json({ error: err.message });
  }
  return next();
}

export class UserRouter {
  private routes = Router();

  constructor(private readonly userController: UserController) {
    this.initRoutes();
  }

  initRoutes() {
    this.routes.get("/", this.userController.getAll);
    this.routes.get("/active", this.userController.getActiveUsers);
    this.routes.get("/:id", this.userController.getById);
    this.routes.post(
      "/",
      validationMiddleware(RegisterUserDTO),
      this.userController.create
    );
    this.routes.delete("/:id", this.userController.delete);
    this.routes.put(
      "/:id",
      validationMiddleware(RegisterUserDTO),
      this.userController.update
    );
    this.routes.patch(
      "/:id/role",
      validateRole,
      this.userController.updateRole
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
