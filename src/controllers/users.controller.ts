import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserControllerModel } from "./models/user";

export class UserController {
  constructor(private readonly userService: UserService) {}
  getAll = async (request: Request, res: Response, next: NextFunction) => {
    try {
      const result: UserControllerModel[] = await this.userService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return next(new Error("error.message"));
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };
}

// const userService = new UserService(userRepository);
// const userController = new UserController(userService);
