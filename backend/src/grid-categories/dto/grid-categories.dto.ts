import { IsNotEmpty } from 'class-validator';

export class CreateGridCategoriesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imageSrc: string;
}
