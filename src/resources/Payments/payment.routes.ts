import express from "express";
const router = express.Router();
import {
  getUserPaymentList,
  payment,
  deletePayment,
  getPayments,
  paystack,
  paymentWebhook,
  getSinglePayment,
} from "./payment.controller";
import { Authorization } from "../../middleware/authorization.middleware";
import { authenticateSessionMiddleware } from "../../middleware/authentication.middleware";

// router.post("/payment", payment);
router.get("/get-payment", authenticateSessionMiddleware, getUserPaymentList);
router.post("/payment",authenticateSessionMiddleware, paystack);
router.post("/payment/webhook", paymentWebhook);
router.get("/get-payment-list", Authorization, authenticateSessionMiddleware, getPayments);
router.get("/get-user-payment", Authorization, authenticateSessionMiddleware, getSinglePayment);
router.delete("/delete-payment", Authorization, deletePayment);
export default {
  router: router,
  path: "/user",
};
