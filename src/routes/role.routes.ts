import { Request, Response, NextFunction, Router } from "express";
import { RoleController } from "../controllers/role.controller";

export const RoleRoutes = (roleController: RoleController) => {
  const roleRoutes = Router();
  roleRoutes.get("/", roleController.getAllRoles);
  roleRoutes.all("/", (req: Request, res: Response) => {
    return res
      .status(405)
      .json({ message: `Método ${req.method} no permitido en esta ruta` });
  });

  return {
    roleRoutes,
  };
};
