"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Subscription_controler_1 = require("./Subscription.controler");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
const subscriptionRouter = express_1.default.Router();
subscriptionRouter.post("/subscription", authentication_middleware_1.authenticateSessionMiddleware, Subscription_controler_1.subscriptionControler);
subscriptionRouter.get("/get-subscriptions", Subscription_controler_1.getSubsciptions);
subscriptionRouter.get("/user-subscription", Subscription_controler_1.getUserSubscriptions);
subscriptionRouter.put("/update-subscription", authentication_middleware_1.authenticateSessionMiddleware, Subscription_controler_1.editSubscription);
subscriptionRouter.delete("/delete-subscription", Subscription_controler_1.deleteSubscription);
exports.default = {
    router: subscriptionRouter,
    path: "/user",
};
