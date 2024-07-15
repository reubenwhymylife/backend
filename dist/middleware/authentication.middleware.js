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
exports.authenticateSessionMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const CustomReasons_1 = require("../utils/CustomReasons");
const Signup_model_1 = __importDefault(require("../resources/Signup/Signup.model"));
const session_model_1 = __importDefault(require("../resources/session/session.model"));
const authenticateSessionMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session || !req.session.isAuthenticated) {
        return res.status(401).error({
            message: CustomReasons_1.Reasons.defaultReasons.FORBIDDEN,
            reason: http_status_codes_1.ReasonPhrases.FORBIDDEN,
            data: [],
        });
    }
    const foundSession = yield session_model_1.default.findOne({
        _id: req.session.id,
    }).exec();
    if (!foundSession) {
        return res.status(401).error({
            message: CustomReasons_1.Reasons.defaultReasons.FORBIDDEN,
            reason: http_status_codes_1.ReasonPhrases.FORBIDDEN,
            data: [],
        });
    }
    if (!req.session.userId) {
        return res.status(401).error({
            message: CustomReasons_1.Reasons.defaultReasons.FORBIDDEN,
            reason: http_status_codes_1.ReasonPhrases.FORBIDDEN,
            data: [],
        });
    }
    const foundUser = yield Signup_model_1.default.findOne({
        _id: req.session.userId,
    }).exec();
    if (!foundUser) {
        return res.status(401).error({
            message: CustomReasons_1.Reasons.defaultReasons.FORBIDDEN,
            reason: http_status_codes_1.ReasonPhrases.FORBIDDEN,
            data: [],
        });
    }
    req.WHYMYLIFE = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
    };
    next();
});
exports.authenticateSessionMiddleware = authenticateSessionMiddleware;
