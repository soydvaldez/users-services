import dotenv from "dotenv";
import fs from "fs";
import path from "node:path";

// export type environmentType = "development" | "production" | "testing";

// Carga el archivo .env en funcion de la variable: ENVIRONMENT. Default: development
export const loadEnvironmentFile = (ENVIRONMENT: string = "development") => {
  let envFile: string = "";

  switch (ENVIRONMENT) {
    case "production":
      envFile = ".env.production";
      break;
    case "testing":
      envFile = ".env.testing";
      break;
    default:
      envFile = ".env.development";
      break;
  }

  const envPath = path.resolve(process.cwd(), envFile);

  if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (result.error) {
      console.error(`Error loading ${envFile}:`, result.error);
      process.exit(1);
    }
    // const { DB_CONFIG, APP_CONFIG } = environmentConfig();
    console.log(
      "================================================================================"
    );
    console.log("ENVIRONMENT INITIALIZATED: " + ENVIRONMENT);
    console.log(`File loaded successfully: ${envPath} `);
    console.log(
      "================================================================================"
    );
  } else {
    console.error(`Error: ${envPath} file not found`);
    process.exit(1);
  }
};
