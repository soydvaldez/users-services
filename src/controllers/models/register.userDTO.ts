import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";

export enum Roles {
  ADMIN = 1,
  EDITOR = 2,
  VIEWER = 3,
  CONTRIBUTOR = 4,
  GUEST = 5,
  ANONYMOUS = 6,
}

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  public readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  public readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsNotEmpty()
  @IsEnum(Roles, {
    message:
      "Role Must be one of: ADMIN, EDITOR, VIEWER, CONTRIBUTOR, GUEST, ANONYMOUS",
  })
  public readonly role: Roles;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Roles
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
