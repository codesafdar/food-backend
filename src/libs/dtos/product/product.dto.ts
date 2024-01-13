import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OptionDto } from "./option.dto";

export class ProductDto {
  @IsNotEmpty()
  category: string

  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  startingPrice: number

  @IsOptional()
  @Type(() => OptionDto)
  optionsList: OptionDto[]

  @IsOptional()
  image: string
}