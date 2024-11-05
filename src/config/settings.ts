export const configuration = () => {
  const APP_CONFIG = {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "127.0.0.1",
  };

  const DB_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "mydatabase",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  };

  return { APP_CONFIG, DB_CONFIG };
};
