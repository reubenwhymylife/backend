import { Document, Schema, model, models } from "mongoose";
import SignupModel from "../Signup/Signup.model";
import FreeSubscriptions from "./FreeSubscriptions";
import schedule from "node-schedule";

interface forMe {
  userId: string;
  noOfMonths: number;
  renewable: boolean;
}

interface forOthers {
  noOfMonths: number;
  renewable: boolean;
}

export interface ISubscription extends Document {
  forMe: forMe;
  forOthers: forOthers;
  totalCost: string;
  reason?: string;
  cancelMe?: boolean;
  cancelOthers?: boolean;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    forMe: {
      userId: { type: Schema.Types.ObjectId, ref: "user" },
      noOfMonths: { type: Number, required: true },
      renewable: { type: Boolean, required: true, default:false },
    },
    forOthers: {
      noOfMonths: { type: Number },
      renewable: { type: Boolean, default:false },
    },
    totalCost: { type: String },
    reason: String,
    cancelMe: Boolean,
    cancelOthers: Boolean,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

subscriptionSchema.post("save", async function (doc) {
  try {
    const register = await SignupModel.findOneAndUpdate(
      { _id: doc.forMe.userId },
      { $push: { subscriptions: doc._id } },
      { new: true }
    );

    if (!register) {
      throw new Error("Associated Register document not found");
    }
  } catch (error: any) {
    console.error("Error pushing subscription to subscription array:", error);
  }

  if (doc.forOthers && doc.forOthers.noOfMonths) {
    try {
      const freeSubs = FreeSubscriptions.create({
        userId: doc.forMe.userId,
        freeCount: 1,
        noOfMonths: doc.forOthers.noOfMonths,
      });
    } catch (error) {
      console.error("Error creating/updating FreeSubscriptions:", error);
    }
  }
  // Schedule job to set isActive to false after 30 days
  const dateToRun = new Date(
    doc.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  schedule.scheduleJob(dateToRun, async () => {
    try {
      await model("subscriptions").findByIdAndUpdate(doc._id, {
        isActive: false,
      });
    } catch (error) {
      console.error("Error updating isActive status:", error);
    }
  });
});

subscriptionSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc && doc.forMe.userId) {
      // Accessing userId via forMe
      await SignupModel.findByIdAndUpdate(
        doc.forMe.userId,
        { $pull: { subscriptions: doc._id } },
        { new: true }
      );
    }
  } catch (error) {
    console.error(
      "Error removing subscription from subscription array:",
      error
    );
    throw error;
  }

  // if (doc.forOthers && doc.forOthers.noOfMonths) {
  //   try {
  //     // Check if FreeSubscriptions exists for the user
  //     const existingFreeSubscription = await FreeSubscriptions.findOne({
  //       userId: doc.forMe.userId,
  //     });

  //     if (existingFreeSubscription) {
  //       // Update existing FreeSubscriptions
  //       await FreeSubscriptions.findOneAndUpdate(
  //         { userId: doc.forMe.userId },
  //         { $set: { noOfMonths: doc.forOthers.noOfMonths } },
  //         { new: true }
  //       );
  //     } else {
  //       // Create new FreeSubscriptions
  //       await FreeSubscriptions.create({
  //         userId: doc.forMe.userId,
  //         freeCount: 1,
  //         noOfMonths: doc.forOthers.noOfMonths,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error creating/updating FreeSubscriptions:", error);
  //   }
  // }
});
subscriptionSchema.post("findOneAndUpdate", async function (doc) {
  if (doc && doc.cancelOthers === true) {
    try {
      // Check if FreeSubscriptions exists for the user
      const existingFreeSubscription = await FreeSubscriptions.findOne({
        userId: doc.forMe.userId,
      });

      if (existingFreeSubscription) {
        // Update existing FreeSubscriptions
        await FreeSubscriptions.findOneAndDelete({ userId: doc.forMe.userId });
      }
    } catch (error) {
      console.error("Error removing FreeSubscriptions:", error);
    }
  }
});

export default model<ISubscription>("subscriptions", subscriptionSchema);
