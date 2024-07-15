import mongoose, { Document, model, Schema } from "mongoose";

export interface Icontact extends Document {
  name: string;
  email: string;
  message: string;
  userId: any;
}

const contactSchema = new Schema<Icontact>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email validation regex
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  message: {
    type: String,
  },
});

export default model<Icontact>("contact", contactSchema);
