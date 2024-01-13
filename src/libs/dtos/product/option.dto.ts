import { IsOptional } from "class-validator"

export interface IoptionObj {
  option: string
  isRequired: boolean
  isMultiple: boolean
  _id?: string
}

export class OptionDto {
  @IsOptional() itemName: string
  @IsOptional() itemPrice: number
  @IsOptional() optionType: IoptionObj
}