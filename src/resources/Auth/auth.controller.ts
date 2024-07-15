import { Response, Request, NextFunction } from "express";
import { Reasons } from "../../utils/CustomReasons";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { WHYMYLIFE_REG_DTO } from "../Signup/Signup.interface";
import { CustomResponse } from "../../types/custome.response";
import bcypt from "bcrypt";
import userAgent from "express-useragent";
import { authService } from "./auth.service";
import SignupModel from "../Signup/Signup.model";
import { RememberMe } from "../../configs/express.global.session";
import { CustomError } from "../../middleware/error.moddleware";
import { isEmpty } from "../../utils/checkEmptyObject";
import SessionModel from "../session/session.model";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as WHYMYLIFE_REG_DTO;
  const ua = userAgent.parse(req.headers["user-agent"] || "");
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }

  if (!email || !password) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Email or Password is Required",
    });
  }
  // Do the logic for login here
  const response = await authService(email, password);
  if(response.isDisabled){
    req.session.destroy((err) => {});
    throw new CustomError({
      message: Reasons.customedReasons.ACCOUNT_BAN,
      code: StatusCodes.UNAUTHORIZED,
      reason: "Your account has being temporarily disabled please contact your admin to resolve these",
    });
  }
  // create session
  req.session.sid = req.session.sid;
  req.session.firstName = response.firstName;
  req.session.lastName = response.lastName;
  req.session.Platform = ua.browser;
  req.session.DeviceName = ua.os;
  req.session.userId = response._id;
  req.session.isRememberMe = RememberMe.YES;
  req.session.isAuthenticated = true;

  req.session.save((err) => {
    if (err) {
      throw new CustomError({
        message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        reason: "ERROR SAVING SESSION",
      });
    } else {
      (res as CustomResponse<WHYMYLIFE_REG_DTO>).status(200).success({
        message: Reasons.customedReasons.LOGIN_SUCCESSFUL,
        data: {
          email: response?.email,
          firstName: response?.firstName,
          lastName: response?.lastName,
          isVerified: response?.isVerified,
          role:response?.role,
          terms: response?.terms,
          payments: response?.payments,
          subscriptions: response?.subscriptions,
        },
      });
    }
  });
};

export const sessionDetails = async (req: Request, res: Response) => {
  if (req.session) {
    const sessionDetails = await SessionModel.findById({
      _id: req.session.id.toString(),
    }).exec();
    (res as CustomResponse<any>).status(200).success({
      message: Reasons.customedReasons.DATA_RETRIEVED,
      data: {
        details: JSON.parse(sessionDetails?.session),
      },
    });
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.isAuthenticated = false;
  req.session.destroy((err) => {});
  (res as CustomResponse<any>).status(200).success({
    message: Reasons.customedReasons.LOGOUT_SUCCESS,
    data: {},
  });
};
