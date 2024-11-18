process.env.NODE_ENV = "production";
import { AUTH, DB_CONFIG, APP_CONFIG } from "../../config/env_setup";

import { JWTUtils } from "./jwt.utils";
import { PasswordUtils } from "./password.utils";

// Settea el ambiente de pruebas
(async () => {
  console.log({ AUTH, DB_CONFIG, APP_CONFIG });
})();
