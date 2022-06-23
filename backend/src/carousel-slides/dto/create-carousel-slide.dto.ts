import { IsNotEmpty } from 'class-validator';

export class CreateCarouselSlideDto {
  @IsNotEmpty()
  headline: string;

  @IsNotEmpty()
  src: string;

  @IsNotEmpty()
  header: string;

  subheader: string;
}
