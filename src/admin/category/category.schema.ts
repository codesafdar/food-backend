import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Category {
  @Prop()
  category: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category)