import { UserRepository } from "../data/persistence/repositories/user.repository";
import { HashService } from "./utils/hash.service";
import { UserAuthenticationService } from "./auth.service";

export const initializeServicesApp = async (userRepository: UserRepository) => {
  const hashService = new HashService(); // Servicio para hashear datos planos y comprobar valores hash

  const authService = new UserAuthenticationService(
    userRepository,
    hashService
  );

  return {
    authService,
    hashService,
  };
};
