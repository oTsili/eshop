import { IsNotEmpty } from 'class-validator';
import { NavBarElement } from '../schemas/navbar.schema';

export class CreateNavbarElementDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  href: string;
}

export class CreateNavbarElementsDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  href: string;

  subNavBarElements: CreateNavbarElementDto[];
}
