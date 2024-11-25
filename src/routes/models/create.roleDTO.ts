import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
