import mongoose, { Document, model, Schema } from "mongoose";
import SignupModel from "../Signup/Signup.model";
import { paymentType } from "./payment.interface";
export enum TxnStatus {
  PENDING = "PENDING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS"
}
export interface Ipayments extends Document {
  type?: paymentType;
  paymentRef?: any;
  userId?: string;
  amount?: number;
  email?:string,
  transactionStatus:TxnStatus
}

const paymentSchema = new Schema<Ipayments>(
  {
    type: {
      type: String,
      enum: Object.values(paymentType)
    },
    paymentRef: {
      type: Object,
    },
    amount: {
      type: Number,
    },
    email:{
      type: String,
    },
    transactionStatus:{
      type:String,
      enum: Object.values(TxnStatus),
      default: TxnStatus.FAILED
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.post("save", async function (doc) {
  try {
    const register = await SignupModel.findOneAndUpdate(
      { _id: doc.userId },
      { $push: { payments: doc._id } },
      { new: true }
    );
    if (!register) {
      throw new Error("Associated Register document not found");
    }
  } catch (error: any) {
    console.error("Error pushing payment to payment array:", error);
  }
});
paymentSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc && doc.userId) {
      await SignupModel.findByIdAndUpdate(
        {_id: doc.userId},
        { $pull: { payments: doc._id } },
        { new: true }
      );
    }
  } catch (error) {
    console.error("Error removing payment from payment array:", error);
    throw error; // Re-throw the error to propagate it upwards
  }
});

export default model<Ipayments>("payments", paymentSchema);
