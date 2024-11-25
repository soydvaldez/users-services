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

import { RoleRoutes } from "./routes/role.routes";
import { UserRouter } from "./routes/user.routes";
import morgan from "morgan";
import { APP_CONFIG, DB_CONFIG } from "./config/env_setup";
import { UserRepository } from "./data/persistence/repositories/user.repository";
import { initializeServicesApp } from "./services/services.module";
import { RoleRepository } from "./data/persistence/repositories/role.repository";
import { AuthRouter } from "./routes/auth.routes";

const app = express();

const setupServer = async () => {
  const userRepository: UserRepository = await getRepository("UserRepository");
  const roleRepository: RoleRepository = await getRepository("RoleRepository");

  const repositories = [userRepository, roleRepository];

  const { authService, userService, roleService } =
    initializeServicesApp(repositories);

  const userController = new UserController(userService);
  const userRoutes = new UserRouter(userController).getRoutes();

  const loginController = new AuthController(authService);
  const authRouter = new AuthRouter(loginController);
  const authRoutes = authRouter.getRoutes();

  let roleController = new RoleController(roleService);
  const { roleRoutes } = RoleRoutes(roleController);

  const { securityMiddlewares } = initializeMiddlewares();

  app.use(express.json());
  app.disable("x-powered-by");
  app.use(morgan("dev"));
  const baseUrl = "/api/v1";
  app.use(securityMiddlewares);
  app.use(`${baseUrl}/auth`, authRoutes);
  app.use(`${baseUrl}/users`, userRoutes);
  app.use(`${baseUrl}/roles`, roleRoutes);
  app.use(`/api/v1/auth`, authRoutes);

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
