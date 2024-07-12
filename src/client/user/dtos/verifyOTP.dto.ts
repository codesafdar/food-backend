import { IsNotEmpty } from "class-validator";

export class VerifyDto { 
  @IsNotEmpty()
  otp: string;
}