import { IsNotEmpty, IsString, } from "class-validator";

export interface ICountry {
  name: string
  dial_code: string
  code: string
}

export class RequestOtpDto {
  @IsNotEmpty()
  country: ICountry

  @IsNotEmpty()
  @IsString()
  mobileNumber: string

  @IsNotEmpty()
  isUser: boolean
}