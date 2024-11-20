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
  console.error(err); // Registro del error real

  if (err.name === "AuthenticationError") {
    const message = {
      error: "Authentication failed",
      message: "Invalid Token",
    };
    return res.status(401).json({ error: true, message });
  }

  if (err.name === "Access Denied") {
    const message = {
      error: "Authentication failed",
      message: "Invalid email or password",
    };
    console.log({ message }); //El log del error
    return res.status(401).json(genericMessage);
  }

  if (err.message === "JsonWebTokenMissing") {
    return res
      .status(401)
      .json({ error: "Token Expired", message: "Generate a new token" });
  }

  // Generic message
  if (err.message === "Invalid Token") {
    // real issue
    err.message;
    //concret issue:
    return res.status(401).json({
      error: "Invalid Token ",
      message: "If the issue persist contact with TI Deparment",
    });
  }

  return res.status(401).json(genericMessage);
}

function registerEventHandler() {
  // Aqui va el verdadero error que se origino en el servidor
}
