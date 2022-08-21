import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectorySeasonDocument = DirectorySeason & Document;

@Schema()
export class DirectorySeason {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectorySeasonSchema =
  SchemaFactory.createForClass(DirectorySeason);
