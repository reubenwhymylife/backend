import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
import { isEmpty } from "../../utils/checkEmptyObject";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
import {
  adminGetUserPurpose,
  deletePurposeService,
  getAllPurposeService,
  getUserPurposeService,
  purposeService,
  updatePurposeService,
  updateUserPurposeService,
} from "./Purpose.service";
import { Ipurpose } from "./Purpose.interface";

export const createPurpose = async (req: Request, res: Response) => {
  const sessionId = req.session.userId;
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }
  const payload: Ipurpose = {
    userId: sessionId,
    purposeName: req.body.purposeName,
    projectName: req.body.projectName,
    whatIsIt: req.body.whatIsIt,
    why: req.body.why,
    whyYou: req.body.whyYou,
    theVision: req.body.theVision,
    theReach: req.body.theReach,
    theMission: req.body.theMission,
    whatDoesItDo: req.body.whatDoesItDo,
    whomDoesItServe: req.body.whomDoesItServe,
    whyShouldItExist: req.body.whyShouldItExist,
    defineYourPurpose: req.body.defineYourPurpose,
    steps: req.body.steps,
    values: req.body.values,
    personalities: req.body.personalities,
  };
  const response = await purposeService(payload);
  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: "PURPOSE_CREATED_SUCCESSFULLY",
    data: [],
  });
};

export const getUserPurpose = async (req: Request, res: Response) => {
  const sessionId = req.session.userId;
  const response = await getUserPurposeService(sessionId);

  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};
export const adminUserPurpose = async (req: Request, res: Response) => {
  const purposeId = req.query.purposeId;
  const response = await adminGetUserPurpose(purposeId);

  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};

export const getAllPurpose = async (req: Request, res: Response) => {
  const response = await getAllPurposeService();
  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};

export const updateUserPurpose = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.session.userId;
  const payload: Ipurpose = {
    userId: sessionId,
    purposeName: req.body.purposeName,
    projectName: req.body.projectName,
    whatIsIt: req.body.whatIsIt,
    why: req.body.why,
    whyYou: req.body.whyYou,
    theVision: req.body.theVision,
    theReach: req.body.theReach,
    theMission: req.body.theMission,
    whatDoesItDo: req.body.whatDoesItDo,
    whomDoesItServe: req.body.whomDoesItServe,
    whyShouldItExist: req.body.whyShouldItExist,
    defineYourPurpose: req.body.defineYourPurpose,
    steps: req.body.steps,
    values: req.body.values,
    personalities: req.body.personalities,
  };
  updateUserPurposeService;
  const response = await updateUserPurposeService(sessionId, payload);
  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: "PURPOSE_UPDATED_SUCCESSFULLY",
    data: response,
  });
};
// update purpose via id
export const updatePurpose = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const purposeId = req.query.purposeId;
  const payload: Ipurpose = {
    purposeName: req.body.purposeName,
    projectName: req.body.projectName,
    whatIsIt: req.body.whatIsIt,
    why: req.body.why,
    whyYou: req.body.whyYou,
    theVision: req.body.theVision,
    theReach: req.body.theReach,
    theMission: req.body.theMission,
    whatDoesItDo: req.body.whatDoesItDo,
    whomDoesItServe: req.body.whomDoesItServe,
    whyShouldItExist: req.body.whyShouldItExist,
    defineYourPurpose: req.body.defineYourPurpose,
    steps: req.body.steps,
    values: req.body.values,
    personalities: req.body.personalities,
  };

  const response = await updatePurposeService(purposeId, payload);
  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: "PURPOSE_UPDATED_SUCCESSFULLY",
    data: response,
  });
};

export const deletePurpose = async (req: Request, res: Response) => {
  const purposeId = req.query.purposeId;
  const response = await deletePurposeService(purposeId as string);
  return (res as CustomResponse<Ipurpose>).status(200).success({
    message: "Purpose Deleted Successfully",
    data: response,
  });
};
