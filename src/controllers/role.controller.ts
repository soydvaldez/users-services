import { RoleService } from "../services/role.service";
import { NextFunction, Response, Request, Router } from "express";

export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(await this.roleService.getAllRoles());
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleName = req.body.name;
      await this.roleService.create(roleName);
      return res.status(201).json({ message: "role created!" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(400).json({ message: `${error.message}` });
      }
      return res.status(500).json({ message: `Internal Server Error` });
    }
  };
}
