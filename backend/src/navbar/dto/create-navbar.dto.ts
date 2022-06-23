import { IsNotEmpty } from 'class-validator';
import { NavBarElement } from '../schemas/navbar.schema';

export class CreateNavbarElementDto {
  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  href: string;

  subNavBarElements: NavBarElement[];
}
