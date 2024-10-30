import { log } from "console";
import { HashService } from "../hash.service";

export class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private hashService: HashService;

  constructor(builder: UserBuilder) {
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.email = builder.email;
    this.password = builder.password;
    this.hashService = builder.hashService;
  }

  // Getters
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

  public getFullName() {
    return this.firstName + this.lastName;
  }

  public async hashPassword(hashService: HashService): Promise<void> {
    this.password = await hashService.hash(this.password);
  }

  public async compare(hashService: HashService, plainPassword: string) {
    return await hashService.compare(this.password, plainPassword);
  }

  // Método estático para acceder al Builder
  public static get Builder() {
    return new UserBuilder();
  }
}

class UserBuilder {
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";
  public hashService!: HashService;

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

  public setHashService(hashService: HashService) {
    this.hashService = hashService;
    return this;
  }

  public build() {
    return new User(this);
  }
}
