import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  tax_id_num: string;

  phone: string;

  address: string;

  city: string;

  country: string;
}
