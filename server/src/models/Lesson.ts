import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for Lesson document
export interface ILesson extends Document {
  title: string;
  subject: string;
  targetAge?: number;
  description?: string;
  steps?: {
    title?: string;
    description?: string;
    aiPrompt?: string;
    duration?: number;
  }[];
  participants: Schema.Types.ObjectId[];
}

const LessonSchema: Schema = new mongoose.Schema({
  title: String,
  subject: String,
  targetAge: Number,
  description: String,
  steps: [
    {
      title: String,
      description: String,
      aiPrompt: String,
      duration: Number
    }
  ],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Child' }]
});

export default mongoose.model<ILesson>('Lesson', LessonSchema);
