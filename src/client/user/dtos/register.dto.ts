import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ICountry } from "./reqOtp.dto";

interface IGender {
  label: string
  value: string
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsEmail()
  @IsOptional()
  emailAddress: string

  @IsOptional()
  gender: IGender

  // @IsDate()
  @IsOptional()
  dateOfBirth: string

  @IsNotEmpty()
  @IsString()
  mobileNumber: string

  @IsNotEmpty()
  country: ICountry
}