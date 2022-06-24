import { IsNotEmpty } from 'class-validator';

export class CreateDragCarouseDto {
  @IsNotEmpty()
  src: string;

  @IsNotEmpty()
  altSrc: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: string;

  sales: string;

  special_price: string;
}
