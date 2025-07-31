import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for Message document
export interface IMessage extends Document {
  senderId: string;
  senderName: string;
  senderType: 'child' | 'ai';
  content: string;
  timestamp: Date;
  lessonId: Schema.Types.ObjectId;
}

const MessageSchema: Schema = new mongoose.Schema({
  senderId: String,
  senderName: String,
  senderType: String, // 'child' | 'ai'
  content: String,
  timestamp: { type: Date, default: Date.now },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
});

export default mongoose.model<IMessage>('Message', MessageSchema);
