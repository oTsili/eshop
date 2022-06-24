import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DragCarouselDocument = DragCarousel & Document;

@Schema()
export class DragCarousel {
  @Prop()
  src: string;

  @Prop()
  altSrc: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  sales: string;

  @Prop()
  special_price: string;
}

export const DragCarouselSchema = SchemaFactory.createForClass(DragCarousel);
