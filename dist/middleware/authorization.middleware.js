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
exports.Authorization = void 0;
const Signup_model_1 = __importDefault(require("../resources/Signup/Signup.model"));
const CustomReasons_1 = require("../utils/CustomReasons");
const Authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield Signup_model_1.default.findById({
        _id: req.session.userId,
    }).exec();
    if (!foundUser || foundUser.role !== "admin") {
        return res.status(401).error({
            message: CustomReasons_1.Reasons.defaultReasons.FORBIDDEN,
            reason: `ONLY_AN_ADMIN_CAN_DELETE`,
            data: [],
        });
    }
    next();
});
exports.Authorization = Authorization;
