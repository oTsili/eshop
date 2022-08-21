import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectoryTypeDocument = DirectoryType & Document;

@Schema()
export class DirectoryType {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectoryTypeSchema = SchemaFactory.createForClass(DirectoryType);
