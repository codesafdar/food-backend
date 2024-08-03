import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ICountry } from "./reqOtp.dto";
import { Types } from 'mongoose';

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

  @IsOptional()
  dateOfBirth: string

  @IsNotEmpty()
  @IsString()
  mobileNumber: string

  @IsNotEmpty()
  country: ICountry
}

export class FavoriteDto {
  @IsNotEmpty()
  productId: Types.ObjectId
}