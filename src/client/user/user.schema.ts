import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { ICityAreaAddress } from "./dtos/address.dto";

@Schema({ _id: false })
class Country {
  @Prop()
  name: string

  @Prop()
  dial_code: string

  @Prop()
  code: string
}

@Schema({_id: false})
class CityAreaAddress {
  @Prop()
  latitude: string
  @Prop()
  longitude: string
}

@Schema()
class Address {
  @Prop()
  address: string

  @Prop()
  cityAreaAddress: CityAreaAddress
}

@Schema({ _id: false })
class Gender {
  @Prop()
  label: string
  @Prop()
  value: string
}

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string

  @Prop()
  emailAddress: string

  @Prop()
  gender: Gender

  @Prop()
  dateOfBirth: Date

  @Prop({ required: true })
  mobileNumber: string

  @Prop()
  country: Country

  @Prop([{ type: Types.ObjectId, ref: 'Products' }])
  favorites: Types.ObjectId[]

  @Prop({ type: [Address], default: [] })
  addresses: Address[]
}

@Schema()
export class OTP {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  otp: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date

  @Prop()
  expiresAt: Date
}

const OTPSchema = SchemaFactory.createForClass(OTP)

const UserSchema = SchemaFactory.createForClass(User)

export { OTPSchema, UserSchema }