import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  noOfItems: number

  @IsNotEmpty()
  total: number

  @IsOptional()
  variation: {
    itemName: string,
    itemPrice: string
  }

  @IsOptional()
  multiple: [
    {
      itemName: string,
      itemPrice: string,
      option: string
    }
  ]
}
