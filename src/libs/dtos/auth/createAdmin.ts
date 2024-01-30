import { IsNotEmpty } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty()
  fName: string

  @IsNotEmpty()
  lName: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

}