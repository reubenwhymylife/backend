import { Response } from "express";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
// import SalesModel from "./Sales.model";
import SignupModel from "../Signup/Signup.model";
import SubscriptionModel from "./Subscription.model";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
import SessionModel from "../session/session.model";
import { ISubscriptions } from "./Subscription.interface";
import FreeSubscriptions from "./FreeSubscriptions";

export const subscriptionService = async (
  salesPayload: any,
  sessionId: any
) => {
  try {
    const newSubscription = new SubscriptionModel(salesPayload);
    await newSubscription.save();
    return newSubscription;
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};

export const getSubscriptionsService = async () => {
  try {
    const response = await SubscriptionModel.find()
      .populate({
        path: "forMe.userId",
        select: "firstName lastName",
      })
      .exec();
    return response;
  } catch (error) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};
export const getUserSubService = async (sessionId: any) => {
  try {
    const response = await SubscriptionModel.find({
      "forMe.userId": sessionId,
    }).exec();
    return response;
  } catch (error) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};
export const adminGetUserSubService = async (sessionId: any) => {
  try {
    const response = await SubscriptionModel.find({
      _id: sessionId,
    })
      .populate({
        path: "forMe.userId",
        select: "firstName lastName",
      })
      .exec();
    return response;
  } catch (error) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};

export const editSubService = async (
  sessionId: any,
  subscriptionPayload: any
) => {
  try {
    // const { subscriptionId, ...data } = subscriptionPayload;
    const update = await SubscriptionModel.findOneAndUpdate(
      { "forMe.userId": sessionId },
      {
        $set: {
          reason: subscriptionPayload.reason,
          cancelMe: subscriptionPayload.cancelMe,
          cancelOthers: subscriptionPayload.cancelOthers,
        },
      },
      { new: true } // Options object
    );

    return update;
  } catch (error) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};

export const deleteSubscriptionService = async (subscriptionId: any) => {
  const response = await SubscriptionModel.findOneAndDelete({
    _id: subscriptionId,
  }).exec();

  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "Record Not Found",
    });
  }
  return response;
};

export const freeSubscriptionService = async () => {
  const response = await FreeSubscriptions.find().exec();
  return response;
};
