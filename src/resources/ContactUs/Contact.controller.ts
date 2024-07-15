import { Request, Response, NextFunction } from "express";
import { error } from "winston";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
import { isEmpty } from "../../utils/checkEmptyObject";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
import { IcontactUs } from "./Contact.interface";
import {
  allContactus,
  createContactUsService,
  deleteContactService,
} from "./Contact.service";

export const createContactUs = async (req: Request, res: Response) => {
  const sessionId = req.session.userId;
  if (isEmpty(req.body)) {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }

  const payload: IcontactUs = {
    userId: sessionId?.toString(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };

  const response = await createContactUsService(payload);
  (res as CustomResponse<IcontactUs>).status(200).success({
    message: "Created Successfully",
    data: [],
  });
};

export const getAllContacts = async (req: Request, res: Response) => {
  const response = await allContactus();
  (res as CustomResponse<IcontactUs>).status(200).success({
    message: Reasons.customedReasons.DATA_RETRIEVED,
    data: response,
  });
};

export const deleteContact = async (req: Request, res: Response) => {
  const conatactId = req.query.conatactId;
  const response = await deleteContactService(conatactId);
  (res as CustomResponse<IcontactUs>).status(200).success({
    message: "Deteted Successfully ",
    data: [],
  });
};
