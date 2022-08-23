import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DirectoryMaterialDocument = DirectoryMaterial & Document;

@Schema()
export class DirectoryMaterial {
  @Prop()
  description: string;

  @Prop()
  code: string;
}

export const DirectoryMaterialSchema = SchemaFactory.createForClass(DirectoryMaterial);
