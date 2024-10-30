import { NextFunction, Request, Response } from "express";
import { AuthRequestBody } from "../interface/auth.requestbody";

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

    return res.status(401).json({
      error: "page not found",
    });
  } else if (err.name === "Access Denied") {
    const message = {
      error: "Authentication failed",
      message: "Invalid email or password",
    };
    console.log({ message }); //Mensaje real
    return res.status(401).json({
      error: "Page Not Found"
    });
  }
}

function registerEventHandler() {
  // Aqui va el verdadero error que se origino en el servidor
}
