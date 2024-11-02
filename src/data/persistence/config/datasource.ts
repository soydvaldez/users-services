import dotenv from "dotenv";
import path from "path";

const ENVIRONMENT = process.env.NODE_ENV || "development";

let entities: string = "";
let migrations: string = "";
let subscribers: string = "";

const properties = {
  production: {
    entities: "dist/data/persistence/entities/**/*.js",
    migration: "dist/data/persistence/migrations/**/*.js",
    subjects: "dist/data/persistence/subscribers/**/*.js",
  },
  development: {
    entities: "src/data/persistence/entities/**/*.ts",
    migration: "src/data/persistence/migrations/**/*.ts",
    subjects: "src/data/persistence/subscribers/**/*.ts",
  },
};

function envfileLoaded(envFile: string) {
  console.log("File env loaded: " + path.resolve("src/" + envFile));
}

if (ENVIRONMENT === "production") {
  let envFile = ".env.production";
  dotenv.config({ path: path.resolve("src/" + envFile) });

  envfileLoaded(envFile);

  entities = properties["production"].entities;
  migrations = properties["production"].migration;
  subscribers = properties["production"].subjects;
}

if (ENVIRONMENT == "development") {
  let envFile = ".env.development";
  dotenv.config({ path: path.resolve("src/" + envFile) });

  envfileLoaded(envFile);

  entities = properties["development"].entities;
  migrations = properties["development"].migration;
  subscribers = properties["development"].subjects;
}

// export const AppDataSource = new DataSource({
  // type: "postgres",
  // host: process.env.HOST ?? "localhost",
  // port: Number(process.env.PORT) ?? 5432,
  // username: process.env.USERNAME ?? "postgres",
  // password: process.env.PASSWORD ?? "postgres",
  // database: process.env.DATABASE ?? "mydatabase",
  // synchronize: false,
  // logging: false,
  // entities: [entities],
  // migrations: ["src/data/persistence/migrations/**/*.ts"],
  // subscribers: ["src/data/persistence/subscribers/**/*.ts"],
// });

// AppDataSource.initialize()
  // .then(() => {
    // console.log(
      // "Data Source has been initialized!" + " ENVIRONMENT: " + ENVIRONMENT
    // );
  // })
  // .catch((err) => {
    // console.error("Error during Data Source initialization", err);
  // });
