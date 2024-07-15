import IRoute from "./generalRoutes";
import SignupRoute from "../resources/Signup/Signup.routes";
import LoginRouter from "../resources/Auth/auth.routes";
import PaymentRoute from "../resources/Payments/payment.routes";
import SubscriptionRoute from "../resources/Subscriptions/Subscription.routes";
import DailymessagesRoute from "../resources/DailyMessages/Dailymessages.routes";
import PurposeRoute from "../resources/Purpose_Plan/Purpose.router";
import ContactusRoute from "../resources/ContactUs/Contact.routes";
const SignUpRoutes: IRoute = SignupRoute;
const AuthRoutes: IRoute = LoginRouter;
const PaymentRoutes: IRoute = PaymentRoute;
const SubscriptionRoutes: IRoute = SubscriptionRoute;
const DailymessageRoutes: IRoute = DailymessagesRoute;
const PurposeRoutes: IRoute = PurposeRoute;
const ContactusRoutes: IRoute = ContactusRoute;

export default [
  SignUpRoutes,
  AuthRoutes,
  PaymentRoutes,
  SubscriptionRoutes,
  DailymessageRoutes,
  PurposeRoutes,
  ContactusRoutes,
];
