import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RegisterUserDTO } from "../../models/register.userDTO";
import { AuthUserDTO } from "../../models/auth.userDTO";

// Middleware personalizado para validar el DTO
export function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Convierte los datos entrantes en una instancia del DTO
    const dtoInstance: RegisterUserDTO[] = plainToInstance(type, req.body);

    // Valida el objeto DTO y recoge los errores
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      // Si hay errores, responde con un mensaje de error
      return res.status(400).json({ errors });
    }

    // Si no hay errores, continúa al siguiente middleware o controlador
    next();
  };
}

export function validationAuthUserMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance: AuthUserDTO[] = plainToInstance(type, req.body);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
}
