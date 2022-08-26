import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryColorsDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
