import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

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
  nominal_number: string;

  @Prop()
  name: string;

  @Prop()
  colors: string[];

  @Prop()
  main_color: string;

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
  images: string[];

  @Prop()
  sales: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
