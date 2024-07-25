import { IsNotEmpty, IsString } from "class-validator";

export class VerifyDto { 
  @IsNotEmpty()
  otp: string;
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  mobileNumber: string
  
  @IsNotEmpty()
  @IsString()
  dial_code: string
}