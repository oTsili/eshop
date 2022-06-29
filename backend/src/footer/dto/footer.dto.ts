import { IsNotEmpty } from 'class-validator';
import { Link } from '../schemas/footer.schema';

export class CreateFooterDto {
  @IsNotEmpty()
  header: string;

  links: Link[];
}
