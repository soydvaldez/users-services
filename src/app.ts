import express from "express";
import { configuration } from "./config/settings";
import { AuthController } from "./controllers/auth.controller";
import { RoleController } from "./controllers/role.controller";
import { UserController } from "./controllers/users.controller";
import {
  closeDependencies,
  initializeDependencies,
} from "./data/persistence/persistence.module";
import { initializeMiddlewares } from "./middleware/middleware.module";
import { AuthRoutes } from "./routes/auth.routes";
import { RoleRoutes } from "./routes/role.routes";
import { UserRouter } from "./routes/user.routes";
import { AuthenticationService } from "./services/auth.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

const app = express();

const setupServer = async () => {
  const userRepository = await initializeDependencies("UserRepository");
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const userRoutes = new UserRouter(userController).getRoutes();

  const roleRepository = await initializeDependencies("RoleRepository");
  const roleService = new RoleService(roleRepository);
  let roleController = new RoleController(roleService);
  const { roleRoutes } = RoleRoutes(roleController);

  const authenticationService = new AuthenticationService(userRepository);
  const authController = new AuthController(authenticationService);
  const { authRoutes } = AuthRoutes(authController);

  const { securityMiddlewares } = initializeMiddlewares(authenticationService);

  app.use(express.json());
  const baseUrl = "/api/v1";
  app.use(securityMiddlewares);
  app.use(`${baseUrl}/auth`, authRoutes);
  app.use(`${baseUrl}/users`, userRoutes);
  app.use(`${baseUrl}/roles`, roleRoutes);

  app.use((req, res, next) => {
    const message: string = "Página no encontrada";
    res.status(404).json({ message });
  });
};

async function initServer() {
  await setupServer();
  const { APP_CONFIG } = configuration();

  app.listen(APP_CONFIG.port, APP_CONFIG.host, () => {
    console.log(`Servidor corriendo en ${APP_CONFIG.host}:${APP_CONFIG.port}`);
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
