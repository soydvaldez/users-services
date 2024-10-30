import express, { NextFunction, Request, Response } from "express";
// Extrae los middlewares
import { userRoutes } from "./controllers/users.controller";
import { roleRoutes } from "./controllers/role.controller";
import { UserRepository } from "./data/persistence/repositories/user.repository";
import { RoleRepository } from "./data/persistence/repositories/role.repository";
import { securityMiddlewares } from "./middleware/middleware.module";
import { routerSecurity } from "./controllers/security.controller";

export const app = express();
app.use(express.json());

let PORT = 3000;
let HOST = "localhost";
if (process.env.NODE_ENV === "production") {
  PORT = 4000;
  HOST = "0.0.0.0";
}

app.set("PORT", PORT);
app.set("HOST", HOST);

// Define los middlewares de seguridad
// app.use(securityMiddlewares);
app.use("/security", routerSecurity);
app.use("/users", securityMiddlewares, userRoutes);
app.use("/roles", securityMiddlewares, roleRoutes);

// Middleware de manejo de errores
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error detectado:", error);
  res.status(error.status || 500).json({
    message: error.message || "Error interno del servidor",
  });
});

app.use((req, res, next) => {
  const message: string = "Página no encontrada";
  res.status(404).json({ message });
});

// Cierre controlado de la conexión
process.on("SIGINT", async () => {
  let instanceUser = await UserRepository.getInstance();
  let instanceRole = await RoleRepository.getInstance();
  instanceUser.closeConnection();
  instanceRole.closeConnection();
  process.exit(0);
});
