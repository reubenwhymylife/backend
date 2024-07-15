import express, { Response, Request, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomResponse } from "../types/custome.response";
import SuccessResponse from "../types/successResponse.interface";
import ErrorResponse from "../types/error.repsonse.interface";

export const responseHandler = <T>(
  req: Request,
  res: CustomResponse<T>,
  next: NextFunction
) => {
  res.success = (response: SuccessResponse<T>) => {
    const { message, data } = response;
    res.status(StatusCodes.OK).json({
      msg: message,
      data: data,
    });
  };
  res.error = (response: ErrorResponse<T>) => {
    const { message, reason, data } = response;
    res.json({
      msg: message,
      reason: reason,
      data: data,
    });
  };
  next();
};
