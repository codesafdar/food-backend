import { Type } from "class-transformer"
import { IsEmail, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"

class UserInfoDto {
  @IsString()
  @IsOptional()
  userId: string

  @IsString()
  @IsOptional()
  addressId: string
}

class GuestInfoDto {
  @IsString()
  fullName: string

  @IsString()
  emailAddress: string

  @IsString()
  mobileNumber: string

  @IsString()
  address: string
}

class Variation {
  itemName: string

  itemPrice: number
}
class CartInfoDto {
  @IsString()
  productId: string

  @IsNumber()
  totalPrice: number

  @IsOptional()
  variation: Variation
  
  @IsNumber()
  noOfItems: number
}


export class CreateOrdersDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => UserInfoDto)
  userInfo: UserInfoDto

  @ValidateNested()
  @IsOptional()
  @Type(() => GuestInfoDto)
  orderAsGuestInfo: GuestInfoDto

  @ValidateNested()
  @Type(() => CartInfoDto)
  cartDataInfo: CartInfoDto
}