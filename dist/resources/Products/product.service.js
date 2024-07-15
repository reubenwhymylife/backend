"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
