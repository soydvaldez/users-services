import { UserRepository } from "../data/persistence/repositories/user.repository";
import { HashUtils } from "./utils/hash.utils";
import { AuthenticationService } from "./auth.service";

export const initializeServicesApp = async (userRepository: UserRepository) => {
  const hashService = new HashUtils(); // Servicio para hashear datos planos y comprobar valores hash

  const authService = new AuthenticationService(userRepository);

  return {
    authService,
    hashService,
  };
};
