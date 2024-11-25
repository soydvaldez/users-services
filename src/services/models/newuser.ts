import { UserRole } from "../../utils";
import { PasswordUtils } from "../utils/password.utils";

export class NewUser {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public isActive: boolean = true;
  public roleId!: number;

  constructor() {}

  // Getters
  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getPassword(): string {
    return this.password; // Considera que la contraseña debería estar hasheada
  }

  public async setPassword(password: string) {
    this.password = await PasswordUtils.generateHashed(password);
  }

  public getRolId() {
    return this.roleId; // Considera que la contraseña debería estar hasheada
  }

  public setRolId(role: UserRole) {
    this.roleId = Number(UserRole[role]);
  }

  public getFullName() {
    return this.firstName + this.lastName;
  }
}
