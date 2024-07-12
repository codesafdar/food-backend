import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
class Country {
  @Prop()
  name: string

  @Prop()
  dial_code: string

  @Prop()
  code: string
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
  date: Date

  @Prop({ required: true })
  mobileNumber: string

  @Prop()
  country: Country
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