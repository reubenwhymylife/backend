"use strict";
// import { Request, Response, NextFunction } from "express";
// import StaffsModel, { Istaff } from "./Staffs.model";
// import { error } from "winston";
// import { CustomResponse } from "../../types/custome.response";
// import { Reasons } from "../../utils/CustomReasons";
// import SignupModel from "../Signup/Signup.model";
// export const createStaff = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const stafffDetails: Istaff = req.body;
//   if (!stafffDetails) {
//     return (res as CustomResponse<null>).status(400).error({
//       message: Reasons.defaultReasons.BAD_REQUEST,
//       reason: "FIELDS_REQUIRED",
//       data: [],
//     });
//   }
//   const newStaff = new StaffsModel({
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//     access: req.body.access,
//     businessId: req.body.businessId,
//   });
//   try {
//     await newStaff.save();
//   } catch (error: any) {
//     console.log(Error);
//     return (res as CustomResponse<null>).status(500).error({
//       message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
//       reason: "SOMETHING_WENT_WRONG",
//       data: error.message,
//     });
//   }
//   return (res as CustomResponse<Istaff>).status(200).success({
//     message: "STAFF_CREATED_SUCCESSFULLY",
//     data: [],
//   });
// };
// export const getStaffProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const staffId = req.query.staffId;
//   const sessionDetails = req.session.userId;
//   const businessProfile = await SignupModel.findById({
//     _id: sessionDetails,
//   }).exec();
//   const businessStaffs = businessProfile?.staffs;
//   let foundStaff: any = null;
//   for (const staff of businessStaffs ?? []) {
//     if (staff === staffId) {
//       foundStaff = staff;
//     }
//   }
//   if (!foundStaff) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "STAFF_NOT_FOUND",
//       data: [],
//     });
//   }
//   const staffProfile = await StaffsModel.findOne({ _id: foundStaff }).exec();
//   return (res as CustomResponse<Istaff>).status(200).success({
//     message: "STAFF_PROFILE",
//     data: staffProfile ?? [],
//   });
// };
// export const editStaffProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const staffId = req.body.staffId;
//   // note that these session id is for the logged in business
//   const sessionDetails = req.session.userId;
//   const businessProfile = await SignupModel.findById({
//     _id: sessionDetails,
//   }).exec();
//   if (!businessProfile) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "INVALIDE_PROFILE_ID",
//       data: [],
//     });
//   }
//   const businessStaffs = businessProfile?.staffs;
//   let foundStaff: any = null;
//   for (const staff of businessStaffs ?? []) {
//     if (staff === staffId) {
//       foundStaff = staff;
//     }
//   }
//   if (!foundStaff) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "STAFF_NOT_FOUND",
//       data: [],
//     });
//   }
//   const actions = await StaffsModel.findByIdAndUpdate(
//     { _id: foundStaff },
//     req.body,
//     { new: true }
//   );
//   return (res as CustomResponse<Istaff>).status(200).success({
//     message: "STAFF_PROFILE_UPDATED",
//     data: actions ?? [],
//   });
// };
// export const deleteStaffProfile = async (req: Request, res: Response) => {
//   const staffId = req.body.staffId;
//   const sessionId = req.session.userId;
//   const businessProfile = await SignupModel.findById({ _id: sessionId }).exec();
//   if (!businessProfile) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "INVALIDE_PROFILE_ID",
//       data: [],
//     });
//   }
//   const businessStaffs = businessProfile?.staffs;
//   let foundStaff: any = null;
//   for (const staff of businessStaffs ?? []) {
//     if (staff === staffId) {
//       foundStaff = staff;
//     }
//   }
//   if (!foundStaff) {
//     return (res as CustomResponse<null>).status(404).error({
//       message: Reasons.defaultReasons.NOT_FOUND,
//       reason: "STAFF_NOT_FOUND",
//       data: [],
//     });
//   }
//   const deleteActions = await StaffsModel.findOneAndDelete(foundStaff).exec();
//   return (res as CustomResponse<Istaff>).status(200).success({
//     message: "STAFF_PROFILE_DELETED",
//     data: deleteActions ?? [],
//   });
// };
