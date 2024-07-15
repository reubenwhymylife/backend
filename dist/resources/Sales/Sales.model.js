"use strict";
// import { Document, Schema, model, models } from "mongoose";
// import SignupModel from "../Signup/Signup.model";
// import productModel from "../Products/payment.model";
// interface CartItem {
//   productId: any;
//   quantity: number;
// }
// export interface ISales extends Document {
//   businessId: any;
//   cart: CartItem[];
//   totalPrice: number;
//   customerName: string;
//   customerEmail: string;
//   transactionDate: Date;
//   paymentMethod: string;
// }
// const cartItemSchema = new Schema<CartItem>({
//   productId: {
//     type: Schema.Types.ObjectId,
//     ref: "products",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1,
//   },
// });
// const salesSchema = new Schema<ISales>(
//   {
//     businessId: {
//       type: Schema.Types.ObjectId,
//       ref: "users",
//       required: true,
//     },
//     cart: [cartItemSchema],
//     totalPrice: {
//       type: Number,
//     },
//     customerName: String,
//     customerEmail: String,
//     transactionDate: {
//       type: Date,
//       required: true,
//     },
//     paymentMethod: {
//       enum: ["cash", "card", "transfer", "coupon"],
//     },
//   },
//   { timestamps: true }
// );
// salesSchema.pre<ISales>("save", async function (next) {
//   try {
//     const sales = this;
//     for (const item of sales.cart) {
//       const foundProduct = await productModel.findById(item.productId).exec();
//       if (!foundProduct) {
//         throw new Error(`Product with ID ${item.productId} not found`);
//       }
//       foundProduct.stock -= item.quantity; // Subtract item quantity from product stock
//       await foundProduct.save();
//     }
//     const register = await SignupModel.findOneAndUpdate(
//       { _id: sales.businessId },
//       { $push: { sales: sales._id } },
//       { new: true }
//     );
//     if (!register) {
//       throw new Error("Associated Register document not found");
//     }
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });
// export default model<ISales>("sales", salesSchema);
