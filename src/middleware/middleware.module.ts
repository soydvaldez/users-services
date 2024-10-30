import { errorMiddleware } from "./error.middleware";
import { UserAuthenticationMiddleware } from "./authentication.middleware";
import { UserAutorizationMiddleware } from "./authorization.middleware";
import { securityService } from "../services/services.module";

if (process.env.NODE_ENV === "development") {
  console.log("development");
  // Aqui pueden ir configuraciones para desarrollo
}

const userAuthorizationMiddleware = new UserAuthenticationMiddleware(
  securityService
);
const userAutorizationMiddleware = new UserAutorizationMiddleware(
  securityService
);

const { isAuthentication } = userAuthorizationMiddleware;
const { isAuthorization } = userAutorizationMiddleware;

const securityMiddlewares = [
  isAuthentication,
  isAuthorization,
  errorMiddleware
];

export { securityMiddlewares };
