import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserRepository } from "../data/persistence/repositories/user.repository";

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

const userService = new UserService(UserRepository.getInstance());
const userController = new UserController(userService);

userRoutes.post("/", userController.getAll);
userRoutes.all("/", (req: Request, res: Response) => {
  return res
    .status(405)
    .json({ message: `Método ${req.method} no permitido en esta ruta` });
});

