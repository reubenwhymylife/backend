import { Response } from "express";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
import SignupModel from "../Signup/Signup.model";
import productModel, { TxnStatus } from "./payment.model";
import paymentModel from "./payment.model";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
import { IPayment } from "./payment.interface";

export const paymentService = async <M extends IPayment>(payload: M) => {
  try {
    const newProduct = new paymentModel({
      userId: payload.userId,
      type: payload.type,
      amount: payload.amount,
      email: payload.email,
      transactionStatus: TxnStatus.PENDING,
    });
    await newProduct.save();
    return newProduct;
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};

export const singlePaymentServie = async (paymentId: any) => {
  try {
    const paymentDetails = await paymentModel
      .findOne({ _id: paymentId })
      .populate({
        path: "userId",
        select: "firstName lastName",
      })
      .exec();
    if (!paymentDetails) {
      throw new CustomError({
        message: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
        code: StatusCodes.NOT_FOUND,
        reason: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
      });
    }

    return paymentDetails;
  } catch (error) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};
export const webhookService = async (email: string, eventRecord: any) => {
  try {
    const info = await paymentModel
      .findOne({ email: email, transactionStatus: TxnStatus.PENDING })
      .exec();
    if (!info) {
      throw new CustomError({
        message: Reasons.customedReasons.USER_NOT_FOUND,
        code: StatusCodes.NOT_FOUND,
        reason: "User with these email is not found",
      });
    }

    const updateUserTxnstatus = await paymentModel.findOneAndUpdate(
      { email: info.email, transactionStatus: TxnStatus.PENDING },
      {
        $set: {
          transactionStatus: eventRecord?.status || TxnStatus.SUCCESS,
          transactionRef: eventRecord?.reference
        },
      },
      { new: true }
    );
    if (updateUserTxnstatus) {
      console.log("Transaction status updated successfully:", updateUserTxnstatus);
    } else {
      console.log("No pending transaction found for this email.");
    }
    // console.log(updateUserTxnstatus)
    // return updateUserTxnstatus;
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};
export const listOfPayments = async (sessionId: any) => {
  try {
    const userPayments = await paymentModel
      .findOne({ userId: sessionId })
      .populate({ path: "userId", select: "firstName lastName payments" })
      .exec();
    return userPayments;
  } catch (error) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};
export const deletePaymentService = async (sessionId: any, paymentId: any) => {
  // try {
  const response = await paymentModel
    .findOneAndDelete({ _id: paymentId })
    .exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
      code: StatusCodes.NOT_FOUND,
      reason: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
    });
  }
  return response;
  // } catch (error) {
  //   console.log(error);
  //   throw new CustomError({
  //     message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
  //     code: StatusCodes.INTERNAL_SERVER_ERROR,
  //     reason: "Something Went Wrong",
  //   });
  // }
};
export const getPaymentService = async (sessionId: any, paymentId: any) => {
  const response = await paymentModel
    .find()
    .populate({ path: "userId", select: "firstName lastName" })
    .exec();
  if (!response) {
    throw new CustomError({
      message: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
      code: StatusCodes.NOT_FOUND,
      reason: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
    });
  }
  return response;
  // } catch (error) {
  //   console.log(error);
  //   throw new CustomError({
  //     message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
  //     code: StatusCodes.INTERNAL_SERVER_ERROR,
  //     reason: "Something Went Wrong",
  //   });
  // }
};
