import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  group: "IT" | "Marketing" | "Sales" | "Guarantee";
}
