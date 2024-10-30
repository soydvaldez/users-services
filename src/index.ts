import dotenv from "dotenv";
const ENVIRONMENT = process.env.NODE_ENV || "development";
import path from "path";

const envFile =
  ENVIRONMENT === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: path.resolve(__dirname, envFile) });

import "reflect-metadata";
import { app } from "./app";

const HOST = app.get("HOST");
const PORT = app.get("PORT");

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  console.log(`Environment: ${ENVIRONMENT}`);
});
