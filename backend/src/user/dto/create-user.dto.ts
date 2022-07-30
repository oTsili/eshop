import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  signupDate: string;

  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // passwordConfirm: string;

  // _id?: string;
}
