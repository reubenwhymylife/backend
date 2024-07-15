import { Request, Response, NextFunction } from "express";
import { error } from "winston";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
import { dailyMessages } from "./Dailymessages.interface";
import DailymessagesModel, { Imessage } from "./Dailymessages.model";
import {
  deleteMessageService,
  getMessageService,
  getSingleMessage,
  messageService,
  updateMessageService,
} from "./Dailymessages.service";
import { isEmpty } from "../../utils/checkEmptyObject";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
export const createMessages = async (
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
  const payload: dailyMessages = {
    section1: req.body.section1,
    section2: req.body.section2,
    date: req.body.date,
  };

  const response = await messageService([payload]);

  return (res as CustomResponse<Imessage>).status(200).success({
    message: "MESSAGE_CREATED_SUCCESSFULLY",
    data: response,
  });
};

export const getMessages = async (req: Request, res: Response) => {
  const response = await getMessageService();
  return (res as CustomResponse<Imessage>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};

export const getsingleMessage = async (req: Request, res: Response) => {
  const messageId = req.query.messageId;
  const response = await getSingleMessage(messageId);
  return (res as CustomResponse<Imessage>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};
export const updateMessage = async (
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

  const messageId = req.query.messageId;
  if (!messageId) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Message ID is required",
    });
  }

  const payload: dailyMessages = {
    section1: req.body.section1,
    section2: req.body.section2,
    date: req.body.date,
  };

  const response = await updateMessageService(messageId, payload);

  return (res as CustomResponse<Imessage>).status(200).success({
    message: "MESSAGE_UPDATED_SUCCESSFULLY",
    data: response,
  });
};
export const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.query.messageId;

  const response = await deleteMessageService(messageId);
  return (res as CustomResponse<Imessage>).status(200).success({
    message: "Message Deleted Successfully",
    data: [],
  });
};
