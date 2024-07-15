import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { error } from "console";
import { CustomReasons } from "../utils/CustomReasons";
// export type CustomErrorContent = {
//     message: string,
//     ctx?: { [key: string]: any }
// };
export type CustomErrorContent = {
  message: string;
  reason?: string;
  data?: string[] | {} | [];
};

type ErrorParams = {
  code?: StatusCodes;
  message?: CustomReasons;
  logging?: boolean;
  reason?: string;
  data?: any[] | {} | [];
};
export class CustomError extends Error {
  private readonly _statusCode: StatusCodes;
  private readonly _ctx?: string;
  private readonly _logging: boolean;
  private readonly _data: string[] | {} | [];
  constructor(errorParams: ErrorParams | any) {
    const { code, message, logging, reason, data } = errorParams;
    super(message);

    this._statusCode = code || StatusCodes.BAD_REQUEST;
    this._ctx = reason !== undefined ? reason : "";
    this._logging = logging || false;
    this._data = data || [] || {};

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  get errors(): CustomErrorContent {
    return { message: this.message, reason: this._ctx, data: this._data };
  }

  get statusCode() {
    return this._statusCode;
  }

  get ctx() {
    return this._ctx;
  }

  get data() {
    return this._data;
  }

  get logging() {
    return this._logging;
  }
}
