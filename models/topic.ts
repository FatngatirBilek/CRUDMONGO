import mongoose, { Schema, Document } from "mongoose";

interface ITopic extends Document {
  title: string;
  description: string;
  content: string;
}

const topicSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Topic =
  mongoose.models.Topic || mongoose.model<ITopic>("Topic", topicSchema);

export default Topic;
