import { Request, Response } from "express";
import { LoginDTO } from "./models/login.requestDTO";
import { RegisterUserDTO } from "./models/register.userDTO";
import { AuthService } from "../services/auth.service";
import { Roles } from "../middleware/utils";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password }: LoginDTO = req.body;
      const token = await this.authService.signIn({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      console.log("Error real: " + error);
      let e = new Error();
      e.name = "AuthenticationError";
      e.message = "Invalid Email or password";
      return res.status(400).json({ name: e.name, message: e.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const registerUserDTO: RegisterUserDTO = req.body;
      await this.authService.register(registerUserDTO);
      return res.status(201).json({ message: "resource created!" });
    } catch (err) {
      this.handlerError(err);
      return res.status(500).json({ message: "something wrong to server" });
    }
  };

  private handlerError(err: any) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
