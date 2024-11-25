import { Role } from "../../data/persistence/entities/Role";

export class User {
  private id: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private isActive: boolean;
  private role: Role;

  constructor(builder: UserBuilder) {
    this.id = builder.id;
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.email = builder.email;
    this.password = builder.password;
    this.role = builder.role;
    this.isActive = builder.isActive;
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password; // Considera que la contraseña debería estar hasheada
  }
  public getIsActive(): boolean {
    return this.isActive;
  }

  public getRol(): Role {
    return this.role; // Considera que la contraseña debería estar hasheada
  }

  public getFullName() {
    return this.firstName + this.lastName;
  }

  // Método estático para acceder al Builder
  public static get Builder() {
    return new UserBuilder();
  }
}

export class UserBuilder {
  public id!: number;
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";
  public isActive: boolean = false;

  public role: Role = {
    name: "",
  };
  public roleId!: number;

  public setId(id: number): this {
    this.id = id;
    return this;
  }

  public setfirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  public setlastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  public setEmail(email: string): this {
    this.email = email;
    return this;
  }

  public setPassword(password: string): this {
    this.password = password;
    return this;
  }

  public setIsActive(isActive: boolean): this {
    this.isActive = isActive;
    return this;
  }

  public setRole(role: Role): this {
    this.role = role;
    return this;
  }

  public setRoleId(roleId: number): this {
    this.roleId = roleId;
    return this;
  }

  public build() {
    return new User(this);
  }
}
