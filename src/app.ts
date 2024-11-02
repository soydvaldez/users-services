import express, { NextFunction, Request, Response } from "express";
// Extrae los middlewares
import { userRoutes } from "./controllers/users.controller";
import { roleRoutes } from "./controllers/role.controller";
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
app.use(securityMiddlewares);
// Rutas de la aplicacion
app.use("/security", routerSecurity);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);

app.use((req, res, next) => {
  const message: string = "Página no encontrada";
  res.status(404).json({ message });
});
