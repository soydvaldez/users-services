import { Router } from "express";
import { validationMiddleware } from "../controllers/middlewares/validators/validation.middleware";
import { AuthUserDTO } from "../controllers/models/auth.userDTO";
import { AuthController } from "../controllers/auth.controller";
import { RegisterUserDTO } from "../controllers/models/register.userDTO";

export const AuthRoutes = (authController: AuthController) => {
  const authRoutes = Router();

  authRoutes.post(
    "/signIn",
    validationMiddleware(AuthUserDTO),
    authController.signIn
  );

  authRoutes.post(
    "/register",
    validationMiddleware(RegisterUserDTO),
    authController.register
  );

  return {
    authRoutes,
  };
};
