import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

// This decorator accepts a single optional argument which is a schema options object (e.g., new mongoose.Schema(_, options)))
@Schema()
export class Product {
  // The schema types for these properties are automatically inferred thanks to TypeScript metadata (and reflection) capabilities.
  @Prop()
  src: string;

  @Prop()
  altSrc: string;

  @Prop()
  name: string;

  @Prop()
  color: string[];

  @Prop()
  heel_height: string;

  @Prop()
  size: string;

  @Prop()
  material: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  sales: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
