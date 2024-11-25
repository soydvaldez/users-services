import { AuthService } from "./auth.service";
import { RoleService } from "./role.service";
import { UserService } from "./user.service";

// satisfacer dependencias, inicializar objetos y exponer los objetos al resto de la app.
// Inicializar acceso a datos, aplicar variables de entorno

const initializeServicesApp = (repositories: any[]) => {
  const [userRepository, roleRepository] = repositories;
  const userService = new UserService(userRepository);

  const authService = new AuthService(userService);

  const roleService = new RoleService(roleRepository);

  return {
    authService,
    userService,
    roleService,
  };
};

export { initializeServicesApp };
