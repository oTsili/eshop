import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryColorDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
