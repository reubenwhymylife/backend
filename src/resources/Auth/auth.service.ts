import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../middleware/error.moddleware";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
import SignupModel from "../Signup/Signup.model";
import { Response } from "express";
export const authService = async (email: string, password: string) => {
  const isExist = await SignupModel.findOne({ email: email }).exec();

  if (!isExist) {
    throw new CustomError({
      message: Reasons.customedReasons.INVALIDE_CREDENTIALS,
      code: StatusCodes.NOT_FOUND,
      reason: "User not found",
    });
  }

  const hashedPassword = await isExist.comparePassword(password);

  if (!hashedPassword) {
    throw new CustomError({
      message: Reasons.customedReasons.INVALIDE_CREDENTIALS,
      code: StatusCodes.BAD_REQUEST,
      reason: "Wrong Email or Password",
    });
  }
  return isExist;
};
