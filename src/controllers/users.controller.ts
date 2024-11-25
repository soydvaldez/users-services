import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserControllerModel } from "./models/user";
import { RegisterUserDTO } from "./models/register.userDTO";

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

  getActiveUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activeUsers = await this.userService.getActiveUsers();
      // remover password:
      const activeUsersTransform = activeUsers
        .map((u) => {
          const { password, createdAt, updatedAt, roleId, ...rest } = u;
          return rest;
        })
        .sort((a, b) => a.id - b.id);
      return res.status(200).json(activeUsersTransform);
    } catch (error) {
      console.log(error);
      return next(new Error("generic message"));
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const user: UserControllerModel = await this.userService.getById(userId);

      const { password, role, ...rest } = user;
      const { name } = role;

      return res.status(200).json({ id: userId, ...rest, role: name });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return res.status(404).json({ message: "User not found" });
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerUserDTO: RegisterUserDTO = req.body;
      const userSaved = await this.userService.create(registerUserDTO);
      return res.status(200).json({ userSaved });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.stack);
      }
      return res.status(500).json({ message: "something wrong" });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const success = await this.userService.delete(userId);
      if (success) {
        return res.status(204).send();
      }
      return res.status(404).send();
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const user: RegisterUserDTO = req.body;
      const userUpdated = await this.userService.update(userId, user);
      if (userUpdated) {
        return res.status(204).send();
      }
      return res.status(404).send();
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };

  updateRole = async (req: Request, res: Response) => {
    try {
      const userId: number = Number(req.params.id);
      const { role } = req.body;
      this.userService.updateRole(userId, role);
      return res.status(204).json({ message: "No content" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
