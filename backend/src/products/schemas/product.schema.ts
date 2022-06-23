import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;
// This decorator accepts a single optional argument which is a schema options object (e.g., new mongoose.Schema(_, options)))
@Schema()
export class Product {
  // The schema types for these properties are automatically inferred thanks to TypeScript metadata (and reflection) capabilities.

  @Prop()
  name: string;

  @Prop()
  value: number;

  @Prop()
  sales: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
