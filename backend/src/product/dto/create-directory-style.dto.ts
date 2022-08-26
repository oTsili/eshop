import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryStyleDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
