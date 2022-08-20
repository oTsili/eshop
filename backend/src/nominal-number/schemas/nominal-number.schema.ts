import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NominalNumberDocument = NominalNumber & Document;

@Schema()
export class NominalNumber {
  @Prop()
  nominal_number: string;
}

export const NominalNumberSchema = SchemaFactory.createForClass(NominalNumber);
