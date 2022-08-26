import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryMaterialDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
