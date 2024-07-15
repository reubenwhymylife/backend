import express, { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CustomResponse } from "../types/custome.response";
import { Reasons } from "../utils/CustomReasons";
import SignupModel from "../resources/Signup/Signup.model";
import SessionModel from "../resources/session/session.model";
export const authenticateSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.isAuthenticated) {
    return (res as CustomResponse<null>).status(401).error({
      message: Reasons.defaultReasons.FORBIDDEN,
      reason: ReasonPhrases.FORBIDDEN,
      data: [],
    });
  }
  const foundSession = await SessionModel.findOne({
    _id: req.session.id,
  }).exec();

  if (!foundSession) {
    return (res as CustomResponse<null>).status(401).error({
      message: Reasons.defaultReasons.FORBIDDEN,
      reason: ReasonPhrases.FORBIDDEN,
      data: [],
    });
  }
  if (!req.session.userId) {
    return (res as CustomResponse<null>).status(401).error({
      message: Reasons.defaultReasons.FORBIDDEN,
      reason: ReasonPhrases.FORBIDDEN,
      data: [],
    });
  }

  const foundUser = await SignupModel.findOne({
    _id: req.session.userId,
  }).exec();
  if (!foundUser) {
    return (res as CustomResponse<null>).status(401).error({
      message: Reasons.defaultReasons.FORBIDDEN,
      reason: ReasonPhrases.FORBIDDEN,
      data: [],
    });
  }

  req.WHYMYLIFE = {
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    email: foundUser.email,
  };
  next();
};
