import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
