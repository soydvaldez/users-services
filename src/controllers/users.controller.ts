import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { UserService } from "../services/user.service";
import { userRepository } from "../data/persistence/persistence.module";

export const userRoutes = Router();

class UserController {
  constructor(private readonly userService: UserService) {}
  getAll = async (request: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return next(new Error("error.message"));
    }
  };
}

const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post("/", userController.getAll);
// request.path: /edit
// request.originalUrl: /users/edit
userRoutes.post(
  "/edit",
  (request: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("test");
  });

userRoutes.all("/", (req: Request, res: Response) => {
  return res
    .status(405)
    .json({ message: `Método ${req.method} no permitido en esta ruta` });
});
