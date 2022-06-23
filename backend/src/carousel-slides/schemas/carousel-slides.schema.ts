import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarouselSlideDocument = CarouselSlide & Document;

@Schema()
export class CarouselSlide {
  @Prop()
  headline: string;

  @Prop()
  src: string;

  @Prop()
  header: string;

  @Prop()
  subheader: string;
}

export const CarouselSlideSchema = SchemaFactory.createForClass(CarouselSlide);
