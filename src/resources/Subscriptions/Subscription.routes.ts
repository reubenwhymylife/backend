import express from "express";
import {
  subscriptionControler,
  getSubsciptions,
  getUserSubscriptions,
  editSubscription,
  deleteSubscription,
  getFreeSubscriptions,
  adminGetUserSubscriptions,
} from "./Subscription.controler";
import { authenticateSessionMiddleware } from "../../middleware/authentication.middleware";
const subscriptionRouter = express.Router();

subscriptionRouter.post(
  "/subscription",
  authenticateSessionMiddleware,
  subscriptionControler
);

subscriptionRouter.get("/get-subscriptions", getSubsciptions);
subscriptionRouter.get("/user-subscription", getUserSubscriptions);
subscriptionRouter.get("/admin-user-subscription", adminGetUserSubscriptions);
subscriptionRouter.put(
  "/update-subscription",
  authenticateSessionMiddleware,
  editSubscription
);
subscriptionRouter.delete("/delete-subscription", deleteSubscription);
subscriptionRouter.get("/get-freeSubscription", getFreeSubscriptions);
export default {
  router: subscriptionRouter,
  path: "/user",
};
