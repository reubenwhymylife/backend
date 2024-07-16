"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsersService = exports.disableAccountService = exports.deleteUserService = exports.updateProfileService = exports.VerifyOtpCodeService = exports.RegisterService = void 0;
const Signup_model_1 = __importDefault(require("./Signup.model"));
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const CustomReasons_1 = require("../../utils/CustomReasons");
const otpGenerator_1 = require("../../utils/otpGenerator");
const sendEmail_1 = require("../../utils/sendEmail");
const path_1 = __importDefault(require("path"));
const templatePath = path_1.default.join(__dirname, "../../../template", "welcome.ejs");
const adminTemplate = path_1.default.join(__dirname, "../../../template", "admin.ejs");
// console.log(templatePath);
const RegisterService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield Signup_model_1.default.findOne({ email: data.email }).exec();
    if (isExist) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ALREADY_EXISTS,
            code: http_status_codes_1.StatusCodes.CONFLICT,
            reason: "User already exists",
        });
    }
    try {
        const newUser = new Signup_model_1.default(data);
        yield newUser.save();
        // send verification email to user
        const verificationToken = otpGenerator_1.OtpManager.setOtp(newUser.email);
        const emailData = {
            to: newUser.email,
            subject: "User Verification Code",
            otp: verificationToken,
            username: `${newUser.firstName} ${newUser.lastName}`,
            emailTemplate: templatePath,
        };
        // console.log(verificationToken);
        yield (0, sendEmail_1.sendEmail)(emailData);
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "ERROR SAVING USER",
        });
    }
});
exports.RegisterService = RegisterService;
const VerifyOtpCodeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = otpGenerator_1.OtpManager.verifyOtp(payload.email, parseInt(payload.otpCode));
    const newUser = yield Signup_model_1.default.findOne({ email: payload.email }).exec();
    if (verify) {
        // send email to admin
        const emailDatas = {
            to: CustomReasons_1.Reasons.customedReasons.ADMIN_EMAIL,
            subject: "New User Notification",
            otp: "verificationToken",
            description: `Welcome to the exciting world of WHYMYLIFE! these is a notification
      message a customer ${newUser === null || newUser === void 0 ? void 0 : newUser.firstName} ${newUser === null || newUser === void 0 ? void 0 : newUser.lastName} just signed up`,
            username: `${newUser === null || newUser === void 0 ? void 0 : newUser.firstName} ${newUser === null || newUser === void 0 ? void 0 : newUser.lastName}`,
            emailTemplate: adminTemplate,
        };
        yield (0, sendEmail_1.sendEmail)(emailDatas);
        return verify;
    }
    else {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.INVALIDE_OTP_PROVIDED,
            code: http_status_codes_1.StatusCodes.CONFLICT,
            reason: "Inavlide Otp code",
        });
    }
});
exports.VerifyOtpCodeService = VerifyOtpCodeService;
const updateProfileService = (payload, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Signup_model_1.default.findOneAndUpdate({ email: payload.email }, {
            $set: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                isVerified: payload.isVerified,
            },
        }, { new: true });
        if (!response) {
            throw new error_moddleware_1.CustomError({
                message: CustomReasons_1.Reasons.customedReasons.USER_NOT_FOUND,
                code: http_status_codes_1.StatusCodes.NOT_FOUND,
                reason: "User not found",
            });
        }
        return response;
    }
    catch (error) {
        console.log(error);
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something went wrong",
        });
    }
});
exports.updateProfileService = updateProfileService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBusiness = yield Signup_model_1.default.findOneAndDelete({
            _id: id,
        }).exec();
        return deletedBusiness;
    }
    catch (error) {
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something went wrong",
        });
    }
});
exports.deleteUserService = deleteUserService;
const disableAccountService = (userId, isDisabled) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Signup_model_1.default.findOneAndUpdate({ _id: userId }, {
            $set: {
                isDisabled: isDisabled
            }
        }, { new: true });
    }
    catch (error) {
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something went wrong",
        });
    }
});
exports.disableAccountService = disableAccountService;
const allUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Signup_model_1.default.find().exec();
        return response;
    }
    catch (error) {
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something went wrong",
        });
    }
});
exports.allUsersService = allUsersService;
