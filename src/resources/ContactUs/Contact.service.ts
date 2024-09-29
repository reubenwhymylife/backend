import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../middleware/error.moddleware";
import { Reasons } from "../../utils/CustomReasons";
import { IcontactUs } from "./Contact.interface";
import ContactModel from "./Contact.model";
import { emailDetails } from "../Signup/Signup.interface";
import SignupModel from "../Signup/Signup.model";
import { sendEmail } from "../../utils/sendEmail";
import path from "path";
const adminTemplate = path.join(__dirname, "../../../template", "admin.ejs");

export const createContactUsService = async <T extends IcontactUs>(
  payload: T
) => {
  const userDetails = await SignupModel.findOne({ _id: payload.userId }).exec();
  const response = new ContactModel(payload);
  await response.save();
  if (!response) {
    throw new CustomError({
      message: Reasons.customedReasons.ERROR_CREATING_DATA,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Error creating message",
    });
  }

  // send email to admin
  const emailDatas: emailDetails = {
    to: Reasons.customedReasons.ADMIN_EMAIL,
    subject: "Contact Us Notification",
    otp: "verificationToken",
    description: `Welcome to the exciting world of WHYMYLIFE! these is a notification
    message a customer ${userDetails?.firstName} ${userDetails?.lastName} just contacted you`,
    username: `${userDetails?.firstName} ${userDetails?.lastName}`, // all these are not needed here
    emailTemplate: adminTemplate,
  };
  await sendEmail(emailDatas);
  return response;
};

export const allContactus = async () => {
  const response = await ContactModel.find().populate("userId").select("-password").exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "",
    });
  }
  return response;
};

export const deleteContactService = async (contactId: any) => {
  const response = await ContactModel.findOneAndDelete({
    _id: contactId,
  }).exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "",
    });
  }
  return response;
};
