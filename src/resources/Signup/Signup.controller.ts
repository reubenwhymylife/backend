import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { WHYMYLIFE_REG_DTO, Roles, Subs, verifyOtp } from "./Signup.interface";
import SignupModel from "./Signup.model";
import {
  RegisterService,
  VerifyOtpCodeService,
  allUsersService,
  deleteUserService,
  disableAccountService,
  updateProfileService,
} from "./Signup.service";
import { CustomError } from "../../middleware/error.moddleware";
import { Reasons } from "../../utils/CustomReasons";
import { NOT_EXTENDED } from "http-status";
import { CustomResponse } from "../../types/custome.response";
import { isEmpty } from "../../utils/checkEmptyObject";

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }

  const registerDto: WHYMYLIFE_REG_DTO = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    terms: req.body.terms,
    role: req.body.role as Roles,
    isDisabled:false
  };

  const response = await RegisterService(registerDto);

  return (res as CustomResponse<WHYMYLIFE_REG_DTO>).status(201).success({
    message: Reasons.customedReasons.REGISTRATION_SUCCESSFUL,
    data: response,
  });
};

export const VerifyOtpCode = async (req: Request, res: Response) => {
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }
  const payload: verifyOtp = {
    email: req.body.email,
    otpCode: req.body.otpCode,
  };
  const response = await VerifyOtpCodeService(payload);
  (res as CustomResponse<WHYMYLIFE_REG_DTO>).status(200).success({
    message: Reasons.customedReasons.VERIFICATION_SUCCESS,
    data: [],
  });
};


export const getUserInfo = async (req: Request, res: Response) => {
  let foundUser;
  try {
    foundUser = await SignupModel.findById({
      _id: req.session.userId,
    })
      .populate({
        path: "payments",
        select: "paymentRef type",
      })
      .populate({
        path: "subscriptions",
        select: "forMe forOthers totalCost",
      })
      .populate({
        path: "purposes",
      })
      .exec();
  } catch (error) {
    console.log(error);
  }

  if (!foundUser) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "User not found",
    });
  }
  const subsFinals: any = [];
  if (foundUser) {
    for (const item of foundUser?.subscriptions) {
      let subscriptionData: Subs = {
        forMe: {
          noOfMonth: item?.forMe?.noOfMonths,
          renewable: item?.forMe?.renewable,
        },
        forOthers: {
          noOfMonth: item?.forOthers?.noOfMonths,
          renewable: item?.forOthers?.renewable,
        },
        totalCost: item?.totalCost,
      };
      subsFinals.push(subscriptionData);
    }
  }
  (res as CustomResponse<WHYMYLIFE_REG_DTO>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: {
      id: foundUser._id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role ?? "",
      payments: foundUser.payments,
      subscriptions: subsFinals,
      purposes: foundUser.purposes,
    },
  });
};
export const adminGetUserInfo = async (req: Request, res: Response) => {
  let foundUser;
  try {
    foundUser = await SignupModel.findById({
      _id: req.query.userId,
    })
      .populate({
        path: "payments",
        select: "paymentRef type",
      })
      .populate({
        path: "subscriptions",
        select: "forMe forOthers totalCost",
      })
      .populate({
        path: "purposes",
      })
      .exec();
  } catch (error) {
    console.log(error);
  }

  if (!foundUser) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "User not found",
    });
  }
  const subsFinals: any = [];
  if (foundUser) {
    for (const item of foundUser?.subscriptions) {
      let subscriptionData: Subs = {
        forMe: {
          noOfMonth: item?.forMe?.noOfMonths,
          renewable: item?.forMe?.renewable,
        },
        forOthers: {
          noOfMonth: item?.forOthers?.noOfMonths,
          renewable: item?.forOthers?.renewable,
        },
        totalCost: item?.totalCost,
      };
      subsFinals.push(subscriptionData);
    }
  }
  (res as CustomResponse<WHYMYLIFE_REG_DTO>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: {
      id: foundUser._id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role ?? "",
      isVerified: foundUser.isVerified,
      isDisabled: foundUser.isDisabled,
      payments: foundUser.payments,
      subscriptions: subsFinals,
      purposes: foundUser.purposes,
    },
  });
};

export const editProfile = async (req: Request, res: Response) => {
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }
  // const founUser = req.body.email;
  const payload: WHYMYLIFE_REG_DTO = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isVerified: req.body.isVerified,
  };

  const response = await updateProfileService(payload);
  (res as CustomResponse<WHYMYLIFE_REG_DTO>).status(200).success({
    message: Reasons.customedReasons.UPDATED_SUCCESS,
    data: [],
  });
};

export const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userProfile = await SignupModel.findById({
    _id: req.query.id,
  }).exec();

  if (!userProfile) {
    throw new CustomError({
      message: Reasons.customedReasons.USER_NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "User not found",
    });
  }

  const response = await deleteUserService(userProfile._id);
  return (res as CustomResponse<null>).status(200).success({
    message: "Deleted Successfully",
    data: [],
  });
};
export const disableUserAccount = async (req:Request, res:Response)=>{
    if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }
  const userId = req.body.userId
  const isDisabled = req.body.isDisabled
  const response = await disableAccountService(userId, isDisabled);
  return (res as CustomResponse<null>).status(200).success({
    message: "Account Updated Successfully",
    data: [],
  });
}

export const getAllUsers = async (req: Request, res: Response) => {
  const response = await allUsersService();
  return (res as CustomResponse<null>).status(200).success({
    message: "Data Retrieved",
    data: response,
  });
};
