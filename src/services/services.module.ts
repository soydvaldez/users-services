import { UserRepository } from "../data/persistence/repositories/user.repository";
import { AuthenticationService } from "./auth.service";
import { environmentConfig } from "../config/settings";

(() => {
  environmentConfig();
  console.log(process.env.AUTH);
  const initializeServicesApp = async (userRepository: UserRepository) => {
    const authService = new AuthenticationService(userRepository);

    return {
      authService,
    };
  };
})();
