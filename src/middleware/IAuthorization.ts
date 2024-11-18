import { NextFunction, Request, Response } from "express";
import { UserAuthorization } from "./utils";


export interface IAuthorization {
  handleAuthorization(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  isAPublicRoute(req: Request): boolean;
  validateUser(req: Request): UserAuthorization;
  isAuthorized(userAuthorization: UserAuthorization): void;
}
