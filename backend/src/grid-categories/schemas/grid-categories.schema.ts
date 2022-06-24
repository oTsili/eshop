import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GridCategoriesDocument = GridCategories & Document;

@Schema()
export class GridCategories {
  @Prop()
  name: string;

  @Prop()
  imageSrc: string;
}

export const GridCategoriesSchema =
  SchemaFactory.createForClass(GridCategories);
