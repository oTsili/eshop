import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectorySizeDocument = DirectorySize & Document;

@Schema()
export class DirectorySize {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectorySizeSchema = SchemaFactory.createForClass(DirectorySize);
