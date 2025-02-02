import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from '../interfaces/entityInterfaces/IAdmin';


const AdminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
