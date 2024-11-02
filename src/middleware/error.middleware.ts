import { NextFunction, Request, Response } from "express";
import { AuthRequestBody } from "../interface/auth.requestbody";

const genericMessage = {
  error: "Authentication failed",
  message: "Invalid email or password",
};

export function errorMiddleware(
  err: Error,
  req: Request<{}, {}, AuthRequestBody>,
  res: Response<any, any>,
  next: NextFunction
) {
  console.error("Error interno:", err); // Registro del error real
  if (err.name === "AuthenticationError") {
    const message = {
      error: "Authentication failed",
      message: "Invalid email or password",
    };
    console.log({ message }); //Mensaje real
    return res.status(401).json(genericMessage);
  } else if (err.name === "Access Denied") {
    const message = {
      error: "Authentication failed",
      message: "Invalid email or password",
    };
    console.log({ message }); //El log del error
    return res.status(401).json(genericMessage);
  }
}

function registerEventHandler() {
  // Aqui va el verdadero error que se origino en el servidor
}
