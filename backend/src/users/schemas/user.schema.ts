import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  signupDate: string;

  @Prop()
  password: string;

  @Prop()
  passwordConfirm: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
