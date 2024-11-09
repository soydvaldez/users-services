import { AUTH } from "../config/env_setup";
import { UserRepository } from "../data/persistence/repositories/user.repository";
import { AuthenticationService } from "./auth.service";

(() => {
  console.log(AUTH);
  const initializeServicesApp = async (userRepository: UserRepository) => {
    const authService = new AuthenticationService(userRepository);

    return {
      authService,
    };
  };
})();
