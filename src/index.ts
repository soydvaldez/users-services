import express, { NextFunction, Request, Response } from "express";
import { RouteSecurity } from "./middleware/handleAuthenticated";
import "reflect-metadata";
import { UserService } from "./data/persistence/user.service";
const app = express();
app.use(express.json());
const PORT = 3000;
(async () => {
  let userService: UserService = await UserService.getInstance();

  // Inicializa el sistema de seguridad de rutas
  const routeSecurity = new RouteSecurity(userService);

  // Extrae los middlewares
  const { isAutenticated, isAuthorized, errorHandler } = routeSecurity;

  // Define los middlewares de seguridad
  const handleSecurity = [
    isAutenticated.bind(routeSecurity),
    isAuthorized.bind(routeSecurity),
    errorHandler.bind(routeSecurity),
  ];
  app.use(handleSecurity);

  app.post("/", (req, res) => {
    const message = "Hola mundo";
    res.status(200).json({ resource: message });
    return;
  });

  // Hacemos que el servidor escuche en el puerto 3000
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})();
