import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ColorsDocument = Colors & Document;

// This decorator accepts a single optional argument which is a schema options object (e.g., new mongoose.Schema(_, options)))
@Schema()
export class Colors {
  // The schema types for these properties are automatically inferred thanks to TypeScript metadata (and reflection) capabilities.
  @Prop()
  colors: string[];

  @Prop()
  _id?: Types.ObjectId;
}

export const ColorsSchema = SchemaFactory.createForClass(Colors);
