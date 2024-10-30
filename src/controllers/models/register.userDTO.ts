import { IsString, IsEmail, IsNotEmpty } from "class-validator";

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

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
