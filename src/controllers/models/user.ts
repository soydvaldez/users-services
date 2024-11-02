import { Role } from "../../data/persistence/entities/Role";

export class UserControllerModel {
  id?: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  isActive!: boolean;
  roleId!: number; // Agrega esta columna para el id directamente
  role!: Role;

//   constructor(
//     id: number,
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string,
//     isActive: boolean,
//     roleId: number
//   ) {
//     this.id = id;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.password = password;
//     this.isActive = isActive;
//     this.roleId = roleId;
//   }
}
