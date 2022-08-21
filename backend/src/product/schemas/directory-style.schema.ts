import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectoryStyleDocument = DirectoryStyle & Document;

@Schema()
export class DirectoryStyle {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectoryStyleSchema = SchemaFactory.createForClass(DirectoryStyle);
