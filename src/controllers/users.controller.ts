import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}
  getAll = async (request: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return next(new Error("error.message"));
    }
  };

  edit(req: Request, res: Response, next: NextFunction): void {
    throw new Error("Method not implemented.");
  }
}

// const userService = new UserService(userRepository);
// const userController = new UserController(userService);
