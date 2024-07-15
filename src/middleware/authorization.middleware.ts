import { Request, Response, NextFunction } from "express";
import SignupModel from "../resources/Signup/Signup.model";
import { ReasonPhrases } from "http-status-codes";
import { CustomResponse } from "../types/custome.response";
import { Reasons } from "../utils/CustomReasons";
export const Authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser = await SignupModel.findById({
    _id: req.session.userId,
  }).exec();
  if (!foundUser || foundUser.role !== "admin") {
    return (res as CustomResponse<null>).status(401).error({
      message: Reasons.defaultReasons.FORBIDDEN,
      reason: `ONLY_AN_ADMIN_CAN_DELETE`,
      data: [],
    });
  }
  next();
};
