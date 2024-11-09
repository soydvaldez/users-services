import { initServer } from "./app";

// Configuraciones & conexiones de infraestructura

export const startApp = async () => {
  await initServer();
};

startApp();
