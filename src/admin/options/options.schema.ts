import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Options {
  @Prop()
  option: string

  @Prop()
  isRequired: boolean

  @Prop()
  isMultiple: boolean
}

export const OptionsSchema = SchemaFactory.createForClass(Options)