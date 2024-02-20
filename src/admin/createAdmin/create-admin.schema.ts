import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


@Schema()
export class Create_Admin {
  @Prop()
  @IsOptional()
  fName: string

  @Prop()
  @IsOptional()
  lName: string

  @Prop()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Prop()
  role: string

  @Prop()
  @IsNotEmpty()
  password: string
}

export const CreateAdminSchema = SchemaFactory.createForClass(Create_Admin)