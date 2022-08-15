import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateWhishlistItemDto {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  product: Types.ObjectId;

  @IsNotEmpty()
  quantity: string;

  @IsNotEmpty()
  user: Types.ObjectId;
}
