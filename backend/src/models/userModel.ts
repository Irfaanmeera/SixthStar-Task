import mongoose, { Schema} from 'mongoose';
import { IUser } from '../interfaces/entityInterfaces/IUser';


const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email:{type:String, required:true, unique:true},
  password: { type: String, required: true },
  group: { type: String, enum: ['IT', 'Marketing', 'Sales', 'Guarantee'], required: true }
});

export const User = mongoose.model<IUser>('User', UserSchema);
