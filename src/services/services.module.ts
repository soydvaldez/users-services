import { userRepository } from "../data/persistence/persistence.module";
import { HashService } from "./hash.service";
import { UserAuthenticationService } from "./userauth.service";

const hashService = new HashService(); // Servicio para hashear datos planos y comprobar valores hash

export const securityService = new UserAuthenticationService(
  userRepository,
  hashService
);

export const SecurityServices = {
  userRepository,
  hashService,
};
