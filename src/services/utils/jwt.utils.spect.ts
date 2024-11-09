process.env.NODE_ENV = "production";
import { AUTH, DB_CONFIG, APP_CONFIG } from "../../config/env_setup";
import { HashUtils } from "./hash.utils";
import { JWTUtils } from "./jwt.utils";

// Settea el ambiente de pruebas
(async () => {
  console.log({ AUTH, DB_CONFIG, APP_CONFIG });

  const token = JWTUtils.signToken({
    email: "user1@domaim.com",
    password: await HashUtils.generateHashedPassword("secret password"),
  });

  console.log(token);
})();
