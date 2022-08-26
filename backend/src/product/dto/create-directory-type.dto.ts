import { IsNotEmpty } from 'class-validator';

export class CreateDirectoryTypeDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
