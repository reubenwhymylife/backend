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
exports.logOut = exports.sessionDetails = exports.Auth = void 0;
const CustomReasons_1 = require("../../utils/CustomReasons");
const http_status_codes_1 = require("http-status-codes");
const express_useragent_1 = __importDefault(require("express-useragent"));
const auth_service_1 = require("./auth.service");
const express_global_session_1 = require("../../configs/express.global.session");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const session_model_1 = __importDefault(require("../session/session.model"));
const Auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const ua = express_useragent_1.default.parse(req.headers["user-agent"] || "");
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    if (!email || !password) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Email or Password is Required",
        });
    }
    // Do the logic for login here
    const response = yield (0, auth_service_1.authService)(email, password);
    if (response.isDisabled) {
        req.session.destroy((err) => { });
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ACCOUNT_BAN,
            code: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            reason: "Your account has being temporarily disabled please contact your admin to resolve these",
        });
    }
    // create session
    req.session.sid = req.session.sid;
    req.session.firstName = response.firstName;
    req.session.lastName = response.lastName;
    req.session.Platform = ua.browser;
    req.session.DeviceName = ua.os;
    req.session.userId = response._id;
    req.session.isRememberMe = express_global_session_1.RememberMe.YES;
    req.session.isAuthenticated = true;
    req.session.save((err) => {
        if (err) {
            throw new error_moddleware_1.CustomError({
                message: CustomReasons_1.Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                reason: "ERROR SAVING SESSION",
            });
        }
        else {
            res.status(200).success({
                message: CustomReasons_1.Reasons.customedReasons.LOGIN_SUCCESSFUL,
                data: {
                    email: response === null || response === void 0 ? void 0 : response.email,
                    firstName: response === null || response === void 0 ? void 0 : response.firstName,
                    lastName: response === null || response === void 0 ? void 0 : response.lastName,
                    isVerified: response === null || response === void 0 ? void 0 : response.isVerified,
                    role: response === null || response === void 0 ? void 0 : response.role,
                    terms: response === null || response === void 0 ? void 0 : response.terms,
                    payments: response === null || response === void 0 ? void 0 : response.payments,
                    subscriptions: response === null || response === void 0 ? void 0 : response.subscriptions,
                },
            });
        }
    });
});
exports.Auth = Auth;
const sessionDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session) {
        const sessionDetails = yield session_model_1.default.findById({
            _id: req.session.id.toString(),
        }).exec();
        res.status(200).success({
            message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
            data: {
                details: JSON.parse(sessionDetails === null || sessionDetails === void 0 ? void 0 : sessionDetails.session),
            },
        });
    }
});
exports.sessionDetails = sessionDetails;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.isAuthenticated = false;
    req.session.destroy((err) => { });
    res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.LOGOUT_SUCCESS,
        data: {},
    });
});
exports.logOut = logOut;
