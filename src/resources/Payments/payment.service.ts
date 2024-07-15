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
      userId:payload.userId,
      type: payload.type,
      amount:payload.amount,
      email:payload.email,
      transactionStatus:TxnStatus.PENDING
    });
    await newProduct.save();
    return newProduct
  } catch (error: any) {
    console.log(error);
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }
};

export const singlePaymentServie = async (paymentId:any)=>{
  try {
    const paymentDetails = await paymentModel.findOne({_id: paymentId}).populate({
      path:"userId",
      select:"firstName lastName"
    }).exec()
    if (!paymentDetails) {
    throw new CustomError({
      message: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
      code: StatusCodes.NOT_FOUND,
      reason: Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
    });
  }
  
  return paymentDetails
  } catch (error) {
    console.log(error)
    throw new CustomError({
      message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
  }

}
export const webhookService = async (email:string)=>{
try {
    const info = await paymentModel.findOne({email:email}).exec()
  if(!info){
     throw new CustomError({
      message: Reasons.customedReasons.USER_NOT_FOUND,
      code: StatusCodes.NOT_FOUND,
      reason: "User with these email is not found",
    });
  }

  const updateUserTxnstatus = await paymentModel.findOneAndUpdate({email:info.email}, {
    $set:{
      transactionStatus: TxnStatus.SUCCESS
    }
  }, {new:true})
  console.log(updateUserTxnstatus)
return updateUserTxnstatus
} catch (error:any) {
  console.log(error);
    throw new CustomError({
      message: error.message,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: "Something Went Wrong",
    });
}
}
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
// export const singleProductService = async (
//   productId: any,
//   sessionId: any,
//   res: Response
// ) => {
//   const businessProfile = await SignupModel.findById({
//     _id: sessionId,
//   }).exec();

//   // const businessProducts = businessProfile?.products;

//   let foundProduct: any = null;
//   for (const staff of businessProducts ?? []) {
//     if (staff === productId) {
//       foundProduct = staff;
//     }
//   }
//   let product: any = null;
//   try {
//     product = await productModel.findOne({ _id: foundProduct }).exec();
//   } catch (error: any) {
//     return (res as CustomResponse<null>).status(500).error({
//       message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
//       reason: "SOEMTHING_WENT_WRONG",
//       data: error.message,
//     });
//   }
//   return product;
// };

// export const editProductDetails = async (
//   payload: any,
//   sessionId: any,
//   res: Response
// ) => {
//   try {
//     const businessProfile = await SignupModel.findById({
//       _id: sessionId,
//     }).exec();
//     if (!businessProfile) {
//       return (res as CustomResponse<null>).status(404).error({
//         message: Reasons.defaultReasons.NOT_FOUND,
//         reason: "INVALIDE_PROFILE_ID",
//         data: [],
//       });
//     }
//     const businessStaffs = businessProfile?.products;
//     let foundProduct: any = null;
//     for (const id of businessStaffs ?? []) {
//       if (id === payload.id) {
//         foundProduct = id;
//       }
//     }
//     return foundProduct;
//   } catch (error: any) {
//     return (res as CustomResponse<null>).status(500).error({
//       message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
//       reason: "SOEMTHING_WENT_WRONG",
//       data: error.message,
//     });
//   }
// };

// export const deleteProductService = async (
//   productId: any,
//   sessionId: any,
//   res: Response
// ) => {
//   const businessProfile = await SignupModel.findById({
//     _id: sessionId,
//   }).exec();
//   if (!businessProfile) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
//       reason: "SOMETHING_WENT_WRONG",
//       data: [],
//     });
//   }
//   const businessStaffs = businessProfile?.products;
//   let foundProduct: any = null;
//   for (const id of businessStaffs ?? []) {
//     if (id === productId) {
//       foundProduct = id;
//     }
//   }
//   return foundProduct;
// };

// export const getAllProductService = async (
//   sessionId: number,
//   res: Response
// ) => {
//   const businessProfile = await SignupModel.findById(sessionId).exec();
//   if (!businessProfile) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
//       reason: "SOMETHING_WENT_WRONG",
//       data: [],
//     });
//   }
//   const products = await productModel
//     .find({ businessId: businessProfile._id })
//     .select("name category price stock expiryDate")
//     .exec();
//   return products;
// };
