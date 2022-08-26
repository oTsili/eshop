import { IsNotEmpty } from 'class-validator';

export class CreateDirectorySizeDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
