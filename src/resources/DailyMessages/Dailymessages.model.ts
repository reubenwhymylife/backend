import mongoose, { Document, model, Schema } from "mongoose";
export interface Imessage extends Document {
  section1: string;
  section2: string;
  date: Date;
}

const messageSchema = new Schema<Imessage>(
  {
    section1: {
      type: String,
    },
    section2: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Imessage>("dailyMessages", messageSchema);
