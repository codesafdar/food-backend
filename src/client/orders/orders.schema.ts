import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Types } from 'mongoose';

@Schema({ _id: false })
class UserInfo {
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  userId: Types.ObjectId[] | null

  @Prop()
  userAddress: string | ''
}

@Schema({ _id: false })
class GuestInfo {
  @Prop()
  fullName: string
  @Prop()
  emailAddress: string
  @Prop()
  mobileNumber: string
  @Prop()
  address: string
}

@Schema({ _id: false })
class Variation {
  @Prop()
  itemName: string

  @Prop()
  itemPrice: number
}

@Schema({ _id: false })
class CartInfo {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId
  @Prop()
  totalPrice: number
  @Prop()
  variation: Variation
  @Prop()
  noOfItems: number
}

@Schema()
export class Orders {
  @Prop()
  userInfo: UserInfo

  @Prop()
  orderAsGuestInfo: GuestInfo

  @Prop()
  cartDataInfo: CartInfo[]
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)