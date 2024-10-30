import { UserRepository } from "../data/persistence/repositories/user.repository";
import { HashService } from "./hash.service";
import { UserAuthenticationService } from "./userauth.service";

const userRepository = UserRepository.getInstance(); // Servicio para acceder a la capa de datos
const hashService = new HashService(); // Servicio para hashear datos planos y comprobar valores hash

export const securityService = new UserAuthenticationService(
  userRepository,
  hashService
);

export const SecurityServices = {
  userRepository,
  hashService,
};
