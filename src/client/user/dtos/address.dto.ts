import { IsNotEmpty, IsString } from "class-validator";

export interface ICityAreaAddress{
  latitude: string
  longitude: string
}

export class UserAddressDto {
  @IsNotEmpty()
  @IsString()
  address: string

  @IsNotEmpty()
  cityAreaAddress: ICityAreaAddress
}