import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Admin_Auth {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string
}

export const AdminAuthSchema = SchemaFactory.createForClass(Admin_Auth)