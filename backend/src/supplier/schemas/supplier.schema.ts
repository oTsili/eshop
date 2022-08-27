import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  tax_id_number: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

export const SupplierDocumentSchema = SchemaFactory.createForClass(Supplier);
