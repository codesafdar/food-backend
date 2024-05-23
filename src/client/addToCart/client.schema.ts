import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

interface IMultiple {
  itemName: string;
  itemPrice: number;
  option: string;
}
interface IVariation {
  itemName: string;
  itemPrice: number;
}

@Schema()
export class Cart {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  noOfItems: number;

  @Prop()
  total: number;

  @Prop({ type: MongooseSchema.Types.Array })
  multiple: IMultiple;

  @Prop({ type: { itemName: '', itemPrice: 0, _id: false } })
  variation: IVariation;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
