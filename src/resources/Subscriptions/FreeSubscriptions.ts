import { Document, Schema, model, models } from "mongoose";

export interface IFreeSub extends Document {
  freeCount: number;
  noOfMonths: number;
  userId?: string;
}

const freeSubscriptionSchema = new Schema<IFreeSub>(
  {
    freeCount: {
      type: Number,
    },
    noOfMonths: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model<IFreeSub>("freeSub", freeSubscriptionSchema);
