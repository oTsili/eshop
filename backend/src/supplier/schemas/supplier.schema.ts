import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop()
  company_name: string;

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

  @Prop()
  id: string;

  @Prop()
  photo: string;

  _id?: Types.ObjectId;
}

export const SupplierDocumentSchema = SchemaFactory.createForClass(Supplier);
