import { RoleService } from "../services/role.service";
import { NextFunction, Response, Request, Router } from "express";

export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(await this.roleService.getAllRoles());
  };
}
