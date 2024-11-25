import { Request, Response, NextFunction, Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { validationMiddleware } from "../controllers/middlewares/validators/validation.middleware";
import { CreateRoleDTO } from "./models/create.roleDTO";

export const RoleRoutes = (roleController: RoleController) => {
  const roleRoutes = Router();
  roleRoutes.get("/", roleController.getAllRoles);
  roleRoutes.post("/", validationMiddleware(CreateRoleDTO),roleController.create);

  roleRoutes.all("/", (req: Request, res: Response) => {
    return res
      .status(405)
      .json({ message: `Método ${req.method} no permitido en esta ruta` });
  });

  return {
    roleRoutes,
  };
};
