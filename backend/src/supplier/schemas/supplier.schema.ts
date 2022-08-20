import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  tax_id_num: string;

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
