import { UserReponse, UserRol, Resource } from "./security/user.interface";

export class RolService {
  static roles: UserRol[] = [
    { id: 1, rol: "admin" },
    { id: 2, rol: "authenticated" },
    { id: 3, rol: "anonymous" },
  ];

  static getRoleById(id: number) {
    return this.roles.find((role) => role.id === id) || null; // Usar `find()` y retornar null si no se encuentra
  }

  static getRolesArray(roles_id: number[]){
    return roles_id.map(RolService.getRoleById).filter(Boolean); // Generar un array solo con roles existentes
  }
}

export class UserAdapter {
  static mapUserResponseToUser(userResponse: UserReponse) {
    const { roles_id, id, ...rest } = userResponse;
    return {
      ...rest,
      roles: RolService.getRolesArray(roles_id),
    };
  }
}

let rol = RolService.getRoleById(3);
console.log(rol);
