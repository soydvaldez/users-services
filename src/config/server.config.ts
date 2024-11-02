import dotenv from "dotenv";
import fs from "fs";
import path from "node:path";

const ENVIRONMENT = process.env.NODE_ENV || "development";

export const settingUpEnvironment = async () => {
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
    const successMessage = `File loaded successfully. Environment: "${ENVIRONMENT}" File: "${envPath}"`;
    console.log(successMessage);
  } else {
    console.error(`Error: ${envPath} file not found`);
    process.exit(1);
  }
};