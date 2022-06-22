import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;
// This decorator accepts a single optional argument which is a schema options object (e.g., new mongoose.Schema(_, options)))
@Schema()
export class Cat {
  // The schema types for these properties are automatically inferred thanks to TypeScript metadata (and reflection) capabilities.

  @Prop()
  name: string;

  // In more complex scenarios types must be indicated explicitly, as follows:
  //   @Prop([String])
  //   tags: string[];

  //  the @Prop() decorator accepts an options object argument. For example:
  //   @Prop({ required: true })
  //   name: string;

  //   In case you want to specify relation to another model
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  //   owner: Owner;

  //   In case there are multiple owners, your property configuration should look as follows:
  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  //   owner: Owner[];

  //   Raw schema definition is useful when, for example, a property represents a nested object which is not defined as a class
  //   @Prop(
  //     raw({
  //       firstName: { type: String },
  //       lastName: { type: String },
  //     }),
  //   )
  //   details: Record<string, any>;

  //   Alternatively, if you prefer not using decorators, you can define a schema manually. For example:
  //   CatSchema = new mongoose.Schema({
  //     name: String,
  //     age: Number,
  //     breed: String,
  //   });

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
