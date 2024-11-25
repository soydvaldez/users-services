import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { UserRole } from "../../utils";

export class UserUpdateDTO {
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
  @IsEnum(UserRole, {
    message:
      "Role Must be one of: ADMIN, EDITOR, VIEWER, CONTRIBUTOR, GUEST, ANONYMOUS",
  })
  public readonly role: UserRole;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRole
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
