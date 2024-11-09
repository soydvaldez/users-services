// Settea el contexto de la aplicacion
// Mandar a inicializar la conexion a la base de datos
// Levantar infraestructura
import {
  APP_PROPERTIES,
  AUTH_PROPERTIES,
  DB_PROPERTIES,
} from "./interface/properties";
import { loadEnvironmentFile } from "./env_loadfile";

const ENVIRONMENT = process.env.NODE_ENV || "development";
loadEnvironmentFile(ENVIRONMENT);

// Tengo una dependencia con el archivo de variables de entorno
let APP_CONFIG!: APP_PROPERTIES;
let DB_CONFIG!: DB_PROPERTIES;
let AUTH!: AUTH_PROPERTIES;

const environmentConfig = () => {
  APP_CONFIG = Object.freeze({
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "127.0.0.1",
  });

  DB_CONFIG = Object.freeze({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "mydatabase",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  });

  AUTH = Object.freeze({
    jwt_secret_key: process.env.JWT_SECRET_KEY || "secret_key",
  });
  
  console.log(
    `Database profile: "${ENVIRONMENT}", properties: [{HOST: ${DB_CONFIG.host}, PORT:${DB_CONFIG.port},USERNAME:${DB_CONFIG.username}, DATABASE:${DB_CONFIG.database}}] `
  );
  console.log(
    `Server App profile: "${ENVIRONMENT}", properties: [{PROTOCOL: http, HOST: ${APP_CONFIG.host}, PORT:${APP_CONFIG.port}}]`
  );
  return { APP_CONFIG, DB_CONFIG, AUTH };
};

environmentConfig();
export { APP_CONFIG, DB_CONFIG, AUTH };