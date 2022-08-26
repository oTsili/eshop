import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryHeelDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
