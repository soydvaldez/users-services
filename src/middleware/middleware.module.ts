import { errorMiddleware } from "./error.middleware";
import { AuthenticationService } from "../services/auth.service";
import { AUTH } from "../config/env_setup";
import { BearerTokenValidator } from "./bearertoken/bearerToken.validator";

const AuthSupported = ["basic-auth", "bearer-token"];

const initializeMiddlewares = (
  authenticationService: AuthenticationService
) => {
  console.log("Tipo de authorizacion: " + AUTH.authType);

  const userAuthorizationMiddleware = new BearerTokenValidator(
    authenticationService
  );

  const { verifyAuth } = userAuthorizationMiddleware;
  const securityMiddlewares = [verifyAuth, errorMiddleware];
  return { securityMiddlewares };
};

export { initializeMiddlewares };
