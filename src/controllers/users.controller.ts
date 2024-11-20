import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserControllerModel } from "./models/user";
import { RegisterUserDTO } from "./models/register.userDTO";
import { UserDtoMapper } from "../adapters/controllers/user.dto.mapper";

export class UserController {
  constructor(private readonly userService: UserService) {}
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: UserControllerModel[] = await this.userService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return next(new Error("error.message"));
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const user: UserControllerModel = await this.userService.getById(userId);

    const { password, role, ...rest } = user;
    const { name } = role;

    res.status(200).json({ id: userId, ...rest, role: name });
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerUserDTO: RegisterUserDTO = req.body;
      const userSaved = await this.userService.create(registerUserDTO);
      res.status(200).json({ userSaved });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.stack);
      }
      res.status(500).json({ message: "something wrong" });
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };
}

// const userService = new UserService(userRepository);
// const userController = new UserController(userService);
