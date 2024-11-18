import express from "express";
import { AuthController } from "./controllers/auth.controller";
import { RoleController } from "./controllers/role.controller";
import { UserController } from "./controllers/users.controller";
import {
  closeDependencies,
  initializeDependencies,
  getRepository,
} from "./data/persistence/persistence.module";
import { initializeMiddlewares } from "./middleware/middleware.module";
import { AuthRoutes } from "./routes/auth.routes";
import { RoleRoutes } from "./routes/role.routes";
import { UserRouter } from "./routes/user.routes";
import { AuthenticationService } from "./services/auth.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import morgan from "morgan";
import { APP_CONFIG, DB_CONFIG } from "./config/env_setup";
import { LoginController } from "./controllers/login.controller";
import { LoginRouter } from "./routes/login.routes";
import { LoginService } from "./services/login.service";
import { UserRepository } from "./data/persistence/repositories/user.repository";
import { initializeServicesApp } from "./services/services.module";

const app = express();

const setupServer = async () => {
  const userRepository: UserRepository = await getRepository("UserRepository");
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const userRoutes = new UserRouter(userController).getRoutes();

  const { loginService, authService } = initializeServicesApp(userRepository);

  const loginController = new LoginController(loginService);
  const loginRouter = new LoginRouter(loginController);
  const loginRoutes = loginRouter.getRoutes();

  const authController = new AuthController(authService);
  const { authRoutes } = AuthRoutes(authController);

  const roleRepository = await getRepository("RoleRepository");
  const roleService = new RoleService(roleRepository);
  let roleController = new RoleController(roleService);
  const { roleRoutes } = RoleRoutes(roleController);

  const { securityMiddlewares } = initializeMiddlewares(authService);

  app.use(express.json());
  app.disable("x-powered-by");
  app.use(morgan("dev"));
  const baseUrl = "/api/v1";
  app.use(securityMiddlewares);
  app.use(`${baseUrl}/auth`, authRoutes);
  app.use(`${baseUrl}/users`, userRoutes);
  app.use(`${baseUrl}/roles`, roleRoutes);
  app.use(`/api/v1/login`, loginRoutes);

  app.use((req, res, next) => {
    const message: string = "ruta no encontrada";
    return res.status(404).json({ message });
  });
};

async function initServer() {
  // initialize environmentConfig

  // initialize Data Access && initialize repositories
  await initializeDependencies(DB_CONFIG);
  // initialize services
  // initialize controllers
  // initialize routes
  await setupServer();

  app.listen(APP_CONFIG.port, APP_CONFIG.host, () => {
    console.log(
      "================================================================================"
    );
    console.log("SERVER INITIALIZATED");
    console.log(
      "================================================================================"
    );
    console.log(`Server running on: ${APP_CONFIG.host}:${APP_CONFIG.port}`);
  });
}

export { initServer };

process.on("SIGINT", async () => {
  console.log("Recibiendo señal (SIGINT) del cierre... CTTRL + C");
  await closeDependencies();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Recibiendo señal (SIGTERM) del cierre...");
  await closeDependencies();
  process.exit(0);
});
