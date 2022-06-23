import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type navBarElementDocument = NavBarElement & Document;

@Schema()
export class NavBarElement {
  @Prop()
  text: string;

  @Prop()
  href: string;

  @Prop({ type: MongooseSchema.Types.Array, required: false })
  subNavBarElements: NavBarElement[];
}

export const NavBarElementSchema = SchemaFactory.createForClass(NavBarElement);
