import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.moddleware";
import { ReasonPhrases } from "http-status-codes";
import { _IS_DEVELOPMENT } from "../utils/application.constants";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, message, logging, errors } = err;
    if (logging) {
      console.error(
        JSON.stringify({
          code: statusCode,
          errors: errors,
          stack: err.stack,
        })
      );
    }

    return res.status(statusCode).send(errors);
  }
  // logToSlack(`${err} URL:${err}`, false);
  console.log(err);
  return res
    .status(500)
    .send({ errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }] });
};
