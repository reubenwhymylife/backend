import { UNAUTHORIZED } from "http-status";
import { ReasonPhrases } from "http-status-codes";
enum MyReasons {
  WRONG_PASSWORD = "Wrong Password",
  INVALID_EMAIL = "Invalid Email",
  LOGIN_INCORRECT_CREDENTIALS = "Username or Password incorrect",
  ENV_NOT_FOUND = "Environmental variables missing",
  INVALIDE_CREDENTIALS = "Invalid credentials",
  DATA_RETRIEVED = "Data Retrieved",
  SESSION_ERROR = "Error saving session",
  FIELD_REQUIRED = "FIELDS_REQUIRED",
  INVALID_OPERATORID = "INVALID_OPERATOR_ID",
  INVALIDE_BUNDLEID = "INVALIDE_BUNDLE_ID",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INVALID_CUSTOMER_IDENTIFIER = "INVALID_CUSTOMER_IDENTIFIER",
  REFERENCE_NOT_UNIQUE = "CUSTOMER_REFERENCE_NOT_UNIQUE",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  INSUFFICIENT_FUND = "INSUFFICIENT_FUND",
  LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL",
  UNEXPECTED_MODULE_REF = "UNEXPECTED_MODULE_REF",
  EXTERNAL_SERVER_ERROR = "EXTERNAL_SERVER_ERROR",
  OPERATORID_NOT_FOUND = "OPERATOR_ID_NOT_FOUND",
  FAILED_TO_PURCHASE_ELECTRICITY = "FAILED_TO_PURCHASE_ELECTRICITY",
  FAILED_TO_PURCHASE_CABLE = "FAILED_TO_PURCHASE_CABLE",
  TRANSACTION_PIN_REQUIRED = "TRANSACTION_PIN_REQUIRED",
  FAILED_TO_GET_DATABUNDLE = "FAILED_TO_GET_DATABUNDLE",
  INVALIDE_ACCOUNT_NUMBER = "INVALIDE_ACCOUNT_NUMBER",
  ERROR_SAVING_USER = "ERROR_SAVING_USER",
  REGISTRATION_SUCCESSFUL = "Registration successful",
  USER_NOT_FOUND = "User not found",
  LOGOUT_SUCCESS = "Logout successful",
  UPDATED_SUCCESS = "Updated successful",
  PAYMENT_DOES_NOT_EXIST = "Payment does not exist",
  ERROR_CREATING_MESSAGE = "Errow Creating Message",
  ERROR_CREATING_PURPOSE = "Errow Creating Purpose",
  ERROR_UPDATING_PURPOSE = "Errow Updating Purpose",
  ERROR_CREATING_DATA = "Errow Creating Data",
  INVALIDE_OTP_PROVIDED = "Invalide OTP Provided",
  VERIFICATION_SUCCESS = "Verification Successful",
  // ADMIN_EMAIL = "lira_typists.05@icloud.com",
  ADMIN_EMAIL = "abrahamjude1999@gmail.com",
  INVALIDE_REQUEST = "Invalid Request",
  UNAUTHORIZED_EVENT_TYPE = "Unhandled event type",
  INVALIDE_SIGNATURE = "Invalid signature",
  ACCOUNT_BAN= "Your account has being temporarily disabled please contact the admin to resolve this!"
}

export namespace Reasons {
  export const defaultReasons = ReasonPhrases;
  export const customedReasons = MyReasons;
}

export type CustomReasons = ReasonPhrases | MyReasons;
