import { Request, Response, Router } from "express";
import { SignInDTO } from "./models/signIn.requestDTO";
import { RegisterUserDTO } from "./models/register.userDTO";
import { validationMiddleware } from "./middlewares/validators/validation.middleware";
import { AuthUserDTO } from "./models/auth.userDTO";
import { securityService } from "../services/services.module";
import { UserAuthenticationService } from "../services/userauth.service";

class SecurityController {
  constructor(
    private readonly userAuthenticationService: UserAuthenticationService
  ) {}

  signIn = (req: Request, res: Response) => {
    const message: string = "routing working!";
    const signInDTO: SignInDTO = req.body;
    res.status(200).json({ message });
  };

  register = async (req: Request, res: Response): Promise<Response> => {
    const registerUserDTO: RegisterUserDTO = req.body; // Asegúrate de que este DTO esté correctamente definido

    const response = await this.userAuthenticationService.register(
      registerUserDTO
    );

    // Lógica para registrar al usuario...
    return res.status(201).json({ response });
  };
}

// Inyeccion de dependencias
const securityController = new SecurityController(securityService);
export const routerSecurity = Router();

routerSecurity.post(
  "/signIn",
  validationMiddleware(AuthUserDTO),
  securityController.signIn
);

routerSecurity.post(
  "/register",
  validationMiddleware(RegisterUserDTO),
  securityController.register
);
