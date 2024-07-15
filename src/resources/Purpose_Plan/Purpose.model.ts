import mongoose, { Document, Model, model, Schema } from "mongoose";
import SignupModel from "../Signup/Signup.model";

export interface Ipurpose extends Document {
  purposeName?: string;
  projectName?: string;
  whatIsIt?: string;
  why?: string;
  whyYou?: string;
  theVision?: string;
  theReach?: string;
  theMission?: string;
  whatDoesItDo?: string;
  whomDoesItServe?: string;
  whyShouldItExist?: string;
  defineYourPurpose?: string;
  steps?: string;
  values?: string;
  personalities?: string;
  userId?: string;
}

const purposeSchema = new Schema<Ipurpose>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    theReach: {
      type: String,
    },
    purposeName: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    whatIsIt: {
      type: String,
    },
    why: {
      type: String,
    },
    whyYou: {
      type: String,
    },
    theVision: {
      type: String,
    },
    theMission: {
      type: String,
    },
    whatDoesItDo: {
      type: String,
    },
    whomDoesItServe: {
      type: String,
    },
    whyShouldItExist: {
      type: String,
    },
    defineYourPurpose: {
      type: String,
    },
    steps: {
      type: String,
    },
    values: {
      type: String,
    },
    personalities: {
      type: String,
    },
  },
  { timestamps: true }
);

purposeSchema.post("save", async function (doc) {
  try {
    const register = await SignupModel.findOneAndUpdate(
      { _id: doc.userId },
      { $push: { purposes: doc._id } },
      { new: true }
    );

    if (!register) {
      throw new Error("Associated Register document not found");
    }
  } catch (error) {
    console.error("Error pushing subscription to subscription array:", error);
  }
});
purposeSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc && doc.forMe.userId) {
      // Accessing userId via forMe
      await SignupModel.findByIdAndUpdate(
        doc.forMe.userId,
        { $pull: { purposes: doc._id } },
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
});
const PurposeModel = model<Ipurpose>("purposes", purposeSchema);

export default PurposeModel;
