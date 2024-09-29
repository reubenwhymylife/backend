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
exports.deleteContactService = exports.allContactus = exports.createContactUsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const CustomReasons_1 = require("../../utils/CustomReasons");
const Contact_model_1 = __importDefault(require("./Contact.model"));
const Signup_model_1 = __importDefault(require("../Signup/Signup.model"));
const sendEmail_1 = require("../../utils/sendEmail");
const path_1 = __importDefault(require("path"));
const adminTemplate = path_1.default.join(__dirname, "../../../template", "admin.ejs");
const createContactUsService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield Signup_model_1.default.findOne({ _id: payload.userId }).exec();
    const response = new Contact_model_1.default(payload);
    yield response.save();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ERROR_CREATING_DATA,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Error creating message",
        });
    }
    // send email to admin
    const emailDatas = {
        to: CustomReasons_1.Reasons.customedReasons.ADMIN_EMAIL,
        subject: "Contact Us Notification",
        otp: "verificationToken",
        description: `Welcome to the exciting world of WHYMYLIFE! these is a notification
    message a customer ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName} just contacted you`,
        username: `${userDetails === null || userDetails === void 0 ? void 0 : userDetails.firstName} ${userDetails === null || userDetails === void 0 ? void 0 : userDetails.lastName}`, // all these are not needed here
        emailTemplate: adminTemplate,
    };
    yield (0, sendEmail_1.sendEmail)(emailDatas);
    return response;
});
exports.createContactUsService = createContactUsService;
const allContactus = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Contact_model_1.default.find().populate("userId").select("-password").exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "",
        });
    }
    return response;
});
exports.allContactus = allContactus;
const deleteContactService = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Contact_model_1.default.findOneAndDelete({
        _id: contactId,
    }).exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "",
        });
    }
    return response;
});
exports.deleteContactService = deleteContactService;
