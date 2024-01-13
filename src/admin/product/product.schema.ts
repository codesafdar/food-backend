import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


interface Ioption {
  isRequired: boolean
  isMultiple: boolean
  option: string
}

interface IOptions {
  itemTitle: string
  itemPrice: number
  optionType: Ioption
}

@Schema()
export class Product {
  @Prop()
  category: string

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  startingPrice: number

  @Prop([{ type: { itemName: '', itemPrice: 0, _id: false, optionType: {} } }])
  optionsList: IOptions

  @Prop()
  image: string

}

export const ProductSchema = SchemaFactory.createForClass(Product)