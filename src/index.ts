import { initServer } from "./app";
import { setupEnvironment } from "./config/setup.environment";

// Configuraciones & conexiones de infraestructura

export const startApp = async () => {
  await setupEnvironment();
  await initServer();
};

startApp();
