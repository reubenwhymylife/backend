import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../middleware/error.moddleware";
import { Reasons } from "../../utils/CustomReasons";
import PurposeModel from "./Purpose.model";
import { Ipurpose } from "./Purpose.interface";

export const purposeService = async (payload: any) => {
  const response = new PurposeModel(payload);
  await response.save();
  if (!response) {
    throw new CustomError({
      message: Reasons.customedReasons.ERROR_CREATING_PURPOSE,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Error creating Purpose",
    });
  }
  return response;
};

export const getUserPurposeService = async (sessionId: any) => {
  const response = await PurposeModel.find({ userId: sessionId }).exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Record Found For These User",
    });
  }
  return response;
};
export const adminGetUserPurpose = async (purposeId: any) => {
  const response = await PurposeModel.findOne({ _id: purposeId }).exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Record Found For These User",
    });
  }
  return response;
};
export const getAllPurposeService = async () => {
  const response = await PurposeModel.find()
  .populate({
    path:"userId",
    select: "firstName lastName"
  })
  .exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Record Found ",
    });
  }
  return response;
};

export const updateUserPurposeService = async <T extends Ipurpose>(
  sessionId: any,
  payload: T
) => {
  const response = await PurposeModel.findOneAndUpdate(
    { userId: sessionId },
    {
      $set: {
        purposeName: payload.purposeName,
        projectName: payload.projectName,
        whatIsIt: payload.whatIsIt,
        why: payload.why,
        whyYou: payload.whyYou,
        theVision: payload.theVision,
        theReach: payload.theReach,
        theMission: payload.theMission,
        whatDoesItDo: payload.whatDoesItDo,
        whomDoesItServe: payload.whomDoesItServe,
        whyShouldItExist: payload.whyShouldItExist,
        defineYourPurpose: payload.defineYourPurpose,
        steps: payload.steps,
        values: payload.values,
        personalities: payload.personalities,
      },
    },
    { new: true }
  );

  if (!response) {
    throw new CustomError({
      message: Reasons.customedReasons.ERROR_UPDATING_PURPOSE,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Error updating Purpose",
    });
  }
  return response;
};
export const updatePurposeService = async <T extends Ipurpose>(
  purposeId: any,
  payload: T
) => {
  const response = await PurposeModel.findOneAndUpdate(
    { _id: purposeId },
    {
      $set: {
        purposeName: payload.purposeName,
        projectName: payload.projectName,
        whatIsIt: payload.whatIsIt,
        why: payload.why,
        whyYou: payload.whyYou,
        theVision: payload.theVision,
        theReach: payload.theReach,
        theMission: payload.theMission,
        whatDoesItDo: payload.whatDoesItDo,
        whomDoesItServe: payload.whomDoesItServe,
        whyShouldItExist: payload.whyShouldItExist,
        defineYourPurpose: payload.defineYourPurpose,
        steps: payload.steps,
        values: payload.values,
        personalities: payload.personalities,
      },
    },
    { new: true }
  );

  if (!response) {
    throw new CustomError({
      message: Reasons.customedReasons.ERROR_UPDATING_PURPOSE,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Error updating Purpose",
    });
  }
  return response;
};

export const deletePurposeService = async (purposeId: string) => {
  const response = await PurposeModel.findOneAndDelete({ _id: purposeId });
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Record Found ",
    });
  }
  return response;
};
