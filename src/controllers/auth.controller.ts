import { Request, Response } from "express";
import { SignInDTO } from "./models/signIn.requestDTO";
import { RegisterUserDTO } from "./models/register.userDTO";
import { AuthenticationService } from "../services/auth.service";

export class AuthController {
  constructor(
    private readonly userAuthenticationService: AuthenticationService
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
