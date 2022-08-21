import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectoryColorDocument = DirectoryColor & Document;

@Schema()
export class DirectoryColor {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectoryColorSchema =
  SchemaFactory.createForClass(DirectoryColor);
