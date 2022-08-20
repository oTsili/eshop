import { IsNotEmpty } from 'class-validator';

export class CreateNominalNumber {
  @IsNotEmpty()
  nominalNumber: string;
}
