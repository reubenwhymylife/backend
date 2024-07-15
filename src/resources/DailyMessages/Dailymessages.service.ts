import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../middleware/error.moddleware";
import { Reasons } from "../../utils/CustomReasons";
import DailymessagesModel from "./Dailymessages.model";
import { dailyMessages } from "./Dailymessages.interface";

export const messageService = async (payload: any) => {
  let newMessage: any;
  for (const message of payload) {
    newMessage = new DailymessagesModel(message);
    await newMessage.save();
  }
  if (!newMessage) {
    throw new CustomError({
      message: Reasons.customedReasons.ERROR_CREATING_MESSAGE,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Error creating message",
    });
  }
  return newMessage;
};

export const getMessageService = async () => {
  const response = await DailymessagesModel.find();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Data Found",
    });
  }
  return response;
};

export const getSingleMessage = async (messageId: any) => {
  const response = await DailymessagesModel.findOne({ _id: messageId }).exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Data Found",
    });
  }
  return response;
};
export const updateMessageService = async (
  messageId: any,
  payload: dailyMessages
) => {
  const response = await DailymessagesModel.findOneAndUpdate(
    { _id: messageId },
    {
      $set: {
        section1: payload.section1,
        section2: payload.section2,
        date: payload.date,
      },
    },
    { new: true }
  );

  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Data Found",
    });
  }

  return response;
};
export const deleteMessageService = async (messageId: any) => {
  const response = await DailymessagesModel.findOneAndDelete({
    _id: messageId,
  }).exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.defaultReasons.NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "No Data Found",
    });
  }
  return response;
};
