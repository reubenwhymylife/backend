import { Request, Response, NextFunction } from "express";
import {
  adminGetUserSubService,
  deleteSubscriptionService,
  editSubService,
  freeSubscriptionService,
  getSubscriptionsService,
  getUserSubService,
  subscriptionService,
} from "./Subscription.service";
import { CustomResponse } from "../../types/custome.response";
import { WHYMYLIFE_REG_DTO } from "../Signup/Signup.interface";
import { ISubscriptions, forMe, forOthers } from "./Subscription.interface";
import { isEmpty } from "../../utils/checkEmptyObject";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
import { Reasons } from "../../utils/CustomReasons";
import { IFreeSub } from "./FreeSubscriptions";
export const subscriptionControler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.session.userId;
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }
  const subscriptionPayload: ISubscriptions = {
    forMe: {
      userId: sessionId || req.body.userId,
      noOfMonths: req.body.forMe.noOfMonths,
      renewable: req.body.forMe.renewable || false,
    },
    forOthers: {
      noOfMonths: req.body.forOthers.noOfMonths,
      renewable: req.body.forOthers.renewable || false,
    },
    totalCost: req.body.totalCost,
    cancelMe: false,
    cancelOthers: false,
  };
  const response = await subscriptionService(subscriptionPayload, sessionId);
  return (res as CustomResponse<null>).status(200).success({
    message: "subscribed successfully",
    data: [],
  });
};

export const getSubsciptions = async (req: Request, res: Response) => {
  const response = await getSubscriptionsService();
  return (res as CustomResponse<ISubscriptions>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
  const sessionId = req.session.userId;

  const response = await getUserSubService(sessionId);
  return (res as CustomResponse<ISubscriptions>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};
export const adminGetUserSubscriptions = async (
  req: Request,
  res: Response
) => {
  const sessionId = req.query.userId;

  const response = await adminGetUserSubService(sessionId);
  return (res as CustomResponse<ISubscriptions>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};

export const editSubscription = async (req: Request, res: Response) => {
  const sessionId = req.session.userId;
  const subscriptionPayload = {
    reason: req.body.reason,
    cancelMe: req.body.cancelMe,
    cancelOthers: req.body.cancelOthers,
  };

  const response = await editSubService(sessionId, subscriptionPayload);
  return (res as CustomResponse<null>).status(200).success({
    message: "subscription updated successfully",
    data: [],
  });
};

export const deleteSubscription = async (req: Request, res: Response) => {
  const subscriptionId = req.query.subscriptionId;
  const response = await deleteSubscriptionService(subscriptionId);
  return (res as CustomResponse<null>).status(200).success({
    message: "subscription deleted successfully",
    data: [],
  });
};

export const getFreeSubscriptions = async (Req: Request, res: Response) => {
  const response = await freeSubscriptionService();
  return (res as CustomResponse<IFreeSub>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};
