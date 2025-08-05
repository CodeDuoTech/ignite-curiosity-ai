import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for AIText document
export interface IAIText extends Document {
  type: 'greeting' | 'ai_response' | 'system_message' | 'encouragement' | 'transition';
  content: string;
  context?: string;
  order?: number;
  isActive: boolean;
}

const AITextSchema: Schema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['greeting', 'ai_response', 'system_message', 'encouragement', 'transition']
  },
  content: {
    type: String,
    required: true
  },
  context: {
    type: String,
    default: 'general'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model<IAIText>('AIText', AITextSchema);
