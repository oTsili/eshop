import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCustomerHistoryDto {
  @IsNotEmpty()
  product: Types.ObjectId;

  @IsNotEmpty()
  user: Types.ObjectId;

  @IsNotEmpty()
  quantity: string;

  @IsNotEmpty()
  date: string;
}
