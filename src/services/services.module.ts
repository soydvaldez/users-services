import { AUTH } from "../config/env_setup";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { AuthenticationService } from "./auth.service";
import { LoginService } from "./login.service";

// satisfacer dependencias, inicializar objetos y exponer los objetos al resto de la app.
// Inicializar acceso a datos, aplicar variables de entorno

const initializeServicesApp = (userRepository: UserRepository) => {
  const authService = new AuthenticationService(userRepository);
  const loginService = new LoginService(userRepository);

  return {
    loginService,
    authService,
  };
};

export { initializeServicesApp };
