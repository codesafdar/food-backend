import { Prop, SchemaFactory } from "@nestjs/mongoose"

export class CartItems {
  @Prop()
  noOfProducts: number
}

export const CartItemsSchema = SchemaFactory.createForClass(CartItems)