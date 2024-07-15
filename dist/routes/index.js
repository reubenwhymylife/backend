"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Signup_routes_1 = __importDefault(require("../resources/Signup/Signup.routes"));
const auth_routes_1 = __importDefault(require("../resources/Auth/auth.routes"));
const payment_routes_1 = __importDefault(require("../resources/Payments/payment.routes"));
const Subscription_routes_1 = __importDefault(require("../resources/Subscriptions/Subscription.routes"));
const Dailymessages_routes_1 = __importDefault(require("../resources/DailyMessages/Dailymessages.routes"));
const Purpose_router_1 = __importDefault(require("../resources/Purpose_Plan/Purpose.router"));
const Contact_routes_1 = __importDefault(require("../resources/ContactUs/Contact.routes"));
const SignUpRoutes = Signup_routes_1.default;
const AuthRoutes = auth_routes_1.default;
const PaymentRoutes = payment_routes_1.default;
const SubscriptionRoutes = Subscription_routes_1.default;
const DailymessageRoutes = Dailymessages_routes_1.default;
const PurposeRoutes = Purpose_router_1.default;
const ContactusRoutes = Contact_routes_1.default;
exports.default = [
    SignUpRoutes,
    AuthRoutes,
    PaymentRoutes,
    SubscriptionRoutes,
    DailymessageRoutes,
    PurposeRoutes,
    ContactusRoutes,
];
