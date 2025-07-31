import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for Child document
export interface IChild extends Document {
  name: string;
  avatar?: string;
  personality?: string;
}

const ChildSchema: Schema = new mongoose.Schema({
  name: String,
  avatar: String,
  personality: String
});

export default mongoose.model<IChild>('Child', ChildSchema);
