import { RoleService } from "../services/role.service";
import { NextFunction, Response, Request, Router } from "express";

export const roleRoutes = Router();

class RoleController {
  constructor(private readonly roleService: RoleService) {}

  getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    // return this.roleService.getAllRoles();
    res.status(200).json(await this.roleService.getAllRoles());
  };
}

let roleService = new RoleService();
const roleController = new RoleController(roleService);

roleRoutes.get("/", roleController.getAllRoles);
roleRoutes.all("/", (req: Request, res: Response) => {
  return res
    .status(405)
    .json({ message: `Método ${req.method} no permitido en esta ruta` });
});
