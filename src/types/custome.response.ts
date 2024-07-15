import { Response } from "express";
import SuccessResponse from "./successResponse.interface";
import ErrorResponse from "./error.repsonse.interface";

export interface CustomResponse<T> extends Response {
  success: (response: SuccessResponse<T>) => void;
  error: (response: ErrorResponse<T>) => void;
}
