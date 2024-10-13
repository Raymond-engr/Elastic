import mongoose, { Document, Schema } from 'mongoose';

export interface ISearch extends Document {
  title: string;
  content: string;
  score: number;
  suggest: {
    input: string[];
    weight: number;
  };
  createdAt: Date;
}

const searchSchema: Schema<ISearch> = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Content cannot be more than 1000 characters']
  },
  score: {
    type: Number,
    required: true
  },
  suggest: {
    input: {
      type: [String],
      required: true
    },
    weight: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISearch>('Search', searchSchema, 'Dictionary');