import { WHYMYLIFE_REG_DTO, emailDetails, verifyOtp } from "./Signup.interface";
import SignupModel from "./Signup.model";
import { CustomError } from "../../middleware/error.moddleware";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CustomResponse } from "../../types/custome.response";
import { Response } from "express";
import { Reasons } from "../../utils/CustomReasons";
import { OtpManager } from "../../utils/otpGenerator";
import { sendEmail } from "../../utils/sendEmail";
import path from "path";
const templatePath = path.join(__dirname, "../../../template", "welcome.ejs");
const adminTemplate = path.join(__dirname, "../../../template", "admin.ejs");
console.log(templatePath);
export const RegisterService = async <M extends WHYMYLIFE_REG_DTO>(data: M) => {
  // check if user exist
  interface emailDetails {
    to: string;
    subject: string;
    otp: any;
    username: string;
    emailTemplate: any;
    description?: string;
  }

  const isExist = await SignupModel.findOne({ email: data.email }).exec();
  if (isExist) {
    throw new CustomError({
      message: Reasons.customedReasons.ALREADY_EXISTS,
      code: StatusCodes.CONFLICT,
      reason: "User already exists",
    });
  }
  try {
    const newUser = new SignupModel(data);
    await newUser.save();

    // send verification email to user
    const verificationToken = OtpManager.setOtp(newUser.email);
    const emailData: emailDetails = {
      to: newUser.email,
      subject: "User Verification Code",
      otp: verificationToken,
      username: `${newUser.firstName} ${newUser.lastName}`,
      emailTemplate: templatePath,
    };
    console.log(verificationToken);
    await sendEmail(emailData);
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "ERROR SAVING USER",
    });
  }
};

export const VerifyOtpCodeService = async <T extends verifyOtp>(payload: T) => {
  const verify = OtpManager.verifyOtp(payload.email, parseInt(payload.otpCode));
  const newUser = await SignupModel.findOne({ email: payload.email }).exec();
  if (verify) {
    // send email to admin
    const emailDatas: emailDetails = {
      to: Reasons.customedReasons.ADMIN_EMAIL,
      subject: "New User Notification",
      otp: "verificationToken",
      description: `Welcome to the exciting world of WHYMYLIFE! these is a notification
      message a customer ${newUser?.firstName} ${newUser?.lastName} just signed up`,
      username: `${newUser?.firstName} ${newUser?.lastName}`,
      emailTemplate: adminTemplate,
    };
    await sendEmail(emailDatas);
    return verify;
  } else {
    throw new CustomError({
      message: Reasons.customedReasons.INVALIDE_OTP_PROVIDED,
      code: StatusCodes.CONFLICT,
      reason: "Inavlide Otp code",
    });
  }
};
export const updateProfileService = async <T extends WHYMYLIFE_REG_DTO>(
  payload: T,
  info?: any
) => {
  try {
    const response = await SignupModel.findOneAndUpdate(
      { email: payload.email },
      {
        $set: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          isVerified: payload.isVerified,
        },
      },
      { new: true }
    );

    if (!response) {
      throw new CustomError({
        message: Reasons.customedReasons.USER_NOT_FOUND,
        code: StatusCodes.NOT_FOUND,
        reason: "User not found",
      });
    }
    return response;
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something went wrong",
    });
  }
};

export const deleteUserService = async (id: any) => {
  try {
    const deletedBusiness = await SignupModel.findOneAndDelete({
      _id: id,
    }).exec();

    return deletedBusiness;
  } catch (error: any) {
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something went wrong",
    });
  }
};

export const disableAccountService = async (userId:any, isDisabled:any)=>{
try {
  const response = await SignupModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
         isDisabled:isDisabled
        }
      },
      { new: true }
    );
} catch (error:any) {
   throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something went wrong",
    });
}
}
export const allUsersService = async () => {
  try {
    const response = await SignupModel.find().exec();
    return response;
  } catch (error: any) {
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something went wrong",
    });
  }
};
