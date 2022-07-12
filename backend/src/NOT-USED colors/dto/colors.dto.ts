import { Types } from "mongoose";

export class CreateColorsDto {
  colors: string[];
  _id?: Types.ObjectId;
}
