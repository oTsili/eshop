import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FooterDocument = Footer & Document;

@Schema()
export class Link {
  @Prop()
  text: string;

  @Prop()
  link: string;
}

@Schema()
export class Footer {
  @Prop()
  header: string;

  @Prop({ type: MongooseSchema.Types.Array, required: false })
  links: Link[];
}

export const FooterSchema = SchemaFactory.createForClass(Footer);
