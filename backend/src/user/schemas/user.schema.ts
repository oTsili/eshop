import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';

// export type AccountDocument = User & Document;

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
  account: Account;

  _id: string;

  _doc: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
