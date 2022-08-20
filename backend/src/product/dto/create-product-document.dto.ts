import { Types } from 'mongoose';

export class CreateProductDto {
  src: string;
  altSrc: string;
  nominal_number: Types.ObjectId;
  colors: string[];
  main_color: string;
  heel_height: string;
  size: string;
  material: string;
  description: string;
  price: string;
  sales: string;
  supplier: Types.ObjectId;
}
