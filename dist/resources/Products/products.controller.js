"use strict";
// import { Request, Response, NextFunction } from "express";
// import productModel, { Iproduucts } from "./product.model";
// import { CustomResponse } from "../../types/custome.response";
// import { Reasons } from "../../utils/CustomReasons";
// import {
//   deleteProductService,
//   editProductDetails,
//   getAllProductService,
//   singleProductService,
// } from "./product.service";
// export const createProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const payload = {
//     name: req.body.name as string,
//     category: req.body.category as string,
//     stock: req.body.stock as number,
//     price: req.body.price as number,
//     businessId: req.body.businessId as string,
//     expiryDate: req.body.expiryDate as Date,
//   };
//   if (!payload) {
//     return (res as CustomResponse<null>).status(400).error({
//       message: Reasons.defaultReasons.BAD_REQUEST,
//       reason: "FIELDS_REQUIRED",
//       data: [],
//     });
//   }
//   try {
//     const newProduct = new productModel(payload);
//     await newProduct.save();
//   } catch (error: any) {
//     console.log(Error);
//     return (res as CustomResponse<null>).status(500).error({
//       message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
//       reason: "SOMETHING_WENT_WRONG",
//       data: error.message,
//     });
//   }
//   return (res as CustomResponse<Iproduucts>).status(200).success({
//     message: "PRODUCT_CREATED_SUCCESSFULLY",
//     data: [],
//   });
// };
// export const getAllProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const sessionId = req.session.userId;
//   const response = await getAllProductService(sessionId ?? 0!, res);
//   if (!response || response === null) {
//     return (res as CustomResponse<null>).status(500).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "NO_PRODUCT_FOUND",
//       data: [],
//     });
//   }
//   return (res as CustomResponse<Iproduucts>).status(200).success({
//     message: "PRODUCT_DETAILS",
//     data: response,
//   });
// };
// export const signleProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const productId = req.query.productId;
//   const sessionDetails = req.session.userId;
//   const response = await singleProductService(productId, sessionDetails, res);
//   if (!response || response === null) {
//     return (res as CustomResponse<null>).status(500).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "NO_PRODUCT_FOUND",
//       data: [],
//     });
//   }
//   return (res as CustomResponse<null>).status(200).success({
//     message: "PRODUCT_DETAILS",
//     data: response ?? [],
//   });
// };
// export const editSingleProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const Payload = {
//     id: req.body.id,
//     body: req.body,
//   };
//   const sessionId = req.session.userId;
//   const response = await editProductDetails(Payload, sessionId, res);
//   const actions = await productModel.findByIdAndUpdate(
//     { _id: response },
//     req.body,
//     { new: true }
//   );
//   return (res as CustomResponse<Iproduucts>).status(200).success({
//     message: "PRODUCT_UPDATED",
//     data: actions ?? [],
//   });
// };
// export const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const productId = req.query.id;
//   const sessionDetails = req.session.userId;
//   const response = await deleteProductService(productId, sessionDetails, res);
//   const action = await productModel.findOneAndDelete({ _id: response }).exec();
//   return (res as CustomResponse<Iproduucts>).status(200).success({
//     message: "PRODUCT_DELETED",
//     data: action ?? [],
//   });
// };
