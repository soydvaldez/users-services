import { LoginService } from "../services/login.service";
import { NextFunction, Request, Response } from "express";

interface LoginRequestBody {
  email: string;
  password: string;
}

export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: LoginRequestBody = req.body;
      const token = await this.loginService.signIn({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      console.log("Error real: " + error);
      let e = new Error();
      e.name = "AuthenticationError";
      e.message = "Invalid Email or password";
      return res.status(400).json({ name: e.name, message: e.message });
    }
  };
}
