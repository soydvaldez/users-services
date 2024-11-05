import { errorMiddleware } from "./error.middleware";
import { UserAuthenticationMiddleware } from "./authentication.middleware";
import { UserAutorizationMiddleware } from "./authorization.middleware";
import { AuthenticationService } from "../services/auth.service";

export const initializeMiddlewares = (
  authenticationService: AuthenticationService
) => {
  const userAuthorizationMiddleware = new UserAuthenticationMiddleware(
    authenticationService
  );
  const userAutorizationMiddleware = new UserAutorizationMiddleware(
    authenticationService
  );

  const { isAuthentication } = userAuthorizationMiddleware;
  const { isAuthorization } = userAutorizationMiddleware;

  const securityMiddlewares = [
    isAuthentication,
    isAuthorization,
    errorMiddleware,
  ];
  return { securityMiddlewares };
};
