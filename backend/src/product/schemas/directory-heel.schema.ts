import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectoryHeelDocument = DirectoryHeel & Document;

@Schema()
export class DirectoryHeel {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectoryHeelSchema = SchemaFactory.createForClass(DirectoryHeel);
