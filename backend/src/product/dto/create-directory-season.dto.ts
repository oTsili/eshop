import { IsNotEmpty } from 'class-validator';

export class CreateDirectorySeasonDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  code: string;
}
