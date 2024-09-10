import dotenv from "dotenv"
dotenv.config()
import { Request, Response, NextFunction } from "express";
import { CustomResponse } from "../../types/custome.response";
import { Reasons } from "../../utils/CustomReasons";
import paymentModel, { Ipayments, TxnStatus } from "./payment.model";
import { isEmpty } from "../../utils/checkEmptyObject";
import { CustomError } from "../../middleware/error.moddleware";
import { StatusCodes } from "http-status-codes";
import * as https from 'https';
import {
  deletePaymentService,
  getPaymentService,
  listOfPayments,
  paymentService,
  singlePaymentServie,
  webhookService,
} from "./payment.service";
import { paymentType } from "./payment.interface";

export const payment = async (
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
  const payload = {
    type: req.body.type,
    paymentRef: req.body.paymentRef,
    amount: parseInt(req.body.amount),
    email:req.body.email,
    userId: req.body.userId,
  };
  if (payload.userId === "" || payload.paymentRef === "") {
    throw new CustomError({
      message: Reasons.customedReasons.FIELD_REQUIRED,
      code: StatusCodes.BAD_REQUEST,
      reason: "Fields Required",
    });
  }
  // const response = await paymentService(payload);
  return (res as CustomResponse<Ipayments>).status(200).success({
    message: "PRAYMENT_CREATED_SUCCESSFULLY",
    data: [],
  });
};

export const getUserPaymentList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.session.userId;
  const response = await listOfPayments(sessionId ?? 0!);

  return (res as CustomResponse<any>).status(200).success({
    message: "PAYMENT_DETAILS",
    data: response,
  });
};

export const getSinglePayment = async (req:Request, res:Response)=>{
    const paymentId = req.query.id as any
    const response = await singlePaymentServie(paymentId)
    return (res as CustomResponse<any>).status(200).success({
    message: "PAYMENT_DETAILS_RETRIEVED",
    data: response,
  });
}

export const deletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.session.userId;
  const paymentId = req.query.paymentId;
  const response = await deletePaymentService(sessionId, paymentId);
  return (res as CustomResponse<any>).status(200).success({
    message: "PAYMENT_DELETED_SUCCESSFULLY",
    data: response
  });
};

export const getPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.session.userId;
  const paymentId = req.query.paymentId;
  const response = await getPaymentService(sessionId, paymentId);
  return (res as CustomResponse<any>).status(200).success({
    message: "PAYMENT_SUCCESSFULLY",
    data: response,
  });
};

export const paystack = async (req: Request, res: Response) => {
  try {
    if (isEmpty(req.body)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: Reasons.customedReasons.FIELD_REQUIRED,
        reason: "Fields Required",
      });
    }
    const userId = req.session.userId as any
    const payload = {
      type: req.body.txnType.toLowerCase(),
      paymentRef: req.body.paymentRef,
      amount: parseInt(req.body.amount),
      email: req.body.email,
    };

    // Save the user information and set the txnStatus to PENDING
    const newPayload = {
      userId: userId,
      email: payload.email,
      amount: payload.amount,
      transactionStatus: TxnStatus.PENDING,
      type: payload.type,
    };
    
    await paymentService(newPayload); 

    const params = JSON.stringify({
      email: payload.email,
      amount: payload.amount * 100,
      callback_url: 'https://whymylife.me',
      cancel_action: 'https://whymylife.me',
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const reqPaystack = https.request(options, (resPaystack: any) => {
      let data = '';

      resPaystack.on('data', (chunk: any) => {
        data += chunk;
      });

      resPaystack.on('end', () => {
        try {
          const responseData = JSON.parse(data);
          return (res as CustomResponse<any>).status(200).success({
    message: "Payment Initialized",
    data: responseData,
  });
        } catch (error) {
          console.error('Error parsing response from Paystack', error);
          res.status(500).json({ error: 'Error parsing response from Paystack' });
        }
      });
    }).on('error', (error: any) => {
      console.error('Error connecting to Paystack', error);
      res.status(500).json({ error: 'Error connecting to Paystack' });
      throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Error connecting to Paystack",
    });

    });

    reqPaystack.write(params);
    reqPaystack.end();
  } catch (error:any) {
    console.error('Error in paystack handler', error);
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};

export const paymentWebhook = async (req:Request, res:Response)=>{
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = require('crypto').createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

 try {
   if (hash === req.headers['x-paystack-signature']) {
    const event = req.body;

    switch (event.event) {
      case 'charge.success':
          const response = await webhookService(event.data.customer.email)
        console.log("Transaction Successful", event.event)
      break;
      default:
        console.log("Unhandled event")
    }
    res.status(200).send("Webhook Received")
  } else {
    // Invalid signature
    throw new CustomError({
      message: Reasons.customedReasons.INVALIDE_SIGNATURE,
      code: StatusCodes.BAD_REQUEST,
      reason: "Inavalid signature",
    });
  }
 } catch (error) {
  console.log(error)
 }

}