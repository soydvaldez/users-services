import {
  initializeDependencies,
  closeDependencies,
} from "./data/persistence/persistence.module";
import { app } from "./app";
import { settingUpEnvironment } from "./config/server.config";

const HOST = app.get("HOST");
const PORT = app.get("PORT");

export const startApp = async () => {
  await settingUpEnvironment();
  await initializeDependencies();

  app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  });
};

startApp();

// Cierre controlado de la conexión
process.on("SIGINT", async () => {
  console.log("Recibiendo señal (SIGINT) del cierre... COMMAND + C");
  await closeDependencies();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Recibiendo señal (SIGTERM) del cierre...");
  await closeDependencies();
  process.exit(0);
});
