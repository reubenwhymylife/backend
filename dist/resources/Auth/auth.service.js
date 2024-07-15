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
exports.authService = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const CustomReasons_1 = require("../../utils/CustomReasons");
const Signup_model_1 = __importDefault(require("../Signup/Signup.model"));
const authService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield Signup_model_1.default.findOne({ email: email }).exec();
    if (!isExist) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.INVALIDE_CREDENTIALS,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "User not found",
        });
    }
    const hashedPassword = yield isExist.comparePassword(password);
    if (!hashedPassword) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.INVALIDE_CREDENTIALS,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Wrong Email or Password",
        });
    }
    return isExist;
});
exports.authService = authService;
