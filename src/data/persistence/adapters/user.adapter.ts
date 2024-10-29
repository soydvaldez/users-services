// Adapta los datos para ser envidos a la base de datos.

import { User } from "../entities/User";
import { NewUser } from "../../../interface/user.interface";

export class UserAdapter {
  static mapNewUserToEntity(newUser: NewUser): User {
    const user = new User();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.email = newUser.email;
    user.password = newUser.password;
    user.isActive = newUser.isActive;
    return user;
  }

  static mapNewUserListToEntityList(newUserList: NewUser[]) {
    return newUserList.map((u) => UserAdapter.mapNewUserToEntity(u));
  }
}
