import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class OptionsDto {
  @IsNotEmpty()
  option: string;

  @IsOptional()
  @IsBoolean()
  isRequired: boolean = false;

  @IsOptional()
  @IsBoolean()
  isMultiple: boolean = false;
}