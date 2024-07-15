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
exports.deletePurposeService = exports.updatePurposeService = exports.updateUserPurposeService = exports.getAllPurposeService = exports.adminGetUserPurpose = exports.getUserPurposeService = exports.purposeService = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const CustomReasons_1 = require("../../utils/CustomReasons");
const Purpose_model_1 = __importDefault(require("./Purpose.model"));
const purposeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new Purpose_model_1.default(payload);
    yield response.save();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ERROR_CREATING_PURPOSE,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Error creating Purpose",
        });
    }
    return response;
});
exports.purposeService = purposeService;
const getUserPurposeService = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Purpose_model_1.default.find({ userId: sessionId }).exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Record Found For These User",
        });
    }
    return response;
});
exports.getUserPurposeService = getUserPurposeService;
const adminGetUserPurpose = (purposeId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Purpose_model_1.default.findOne({ _id: purposeId }).exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Record Found For These User",
        });
    }
    return response;
});
exports.adminGetUserPurpose = adminGetUserPurpose;
const getAllPurposeService = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Purpose_model_1.default.find()
        .populate({
        path: "userId",
        select: "firstName lastName"
    })
        .exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Record Found ",
        });
    }
    return response;
});
exports.getAllPurposeService = getAllPurposeService;
const updateUserPurposeService = (sessionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Purpose_model_1.default.findOneAndUpdate({ userId: sessionId }, {
        $set: {
            purposeName: payload.purposeName,
            projectName: payload.projectName,
            whatIsIt: payload.whatIsIt,
            why: payload.why,
            whyYou: payload.whyYou,
            theVision: payload.theVision,
            theReach: payload.theReach,
            theMission: payload.theMission,
            whatDoesItDo: payload.whatDoesItDo,
            whomDoesItServe: payload.whomDoesItServe,
            whyShouldItExist: payload.whyShouldItExist,
            defineYourPurpose: payload.defineYourPurpose,
            steps: payload.steps,
            values: payload.values,
            personalities: payload.personalities,
        },
    }, { new: true });
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ERROR_UPDATING_PURPOSE,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Error updating Purpose",
        });
    }
    return response;
});
exports.updateUserPurposeService = updateUserPurposeService;
const updatePurposeService = (purposeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Purpose_model_1.default.findOneAndUpdate({ _id: purposeId }, {
        $set: {
            purposeName: payload.purposeName,
            projectName: payload.projectName,
            whatIsIt: payload.whatIsIt,
            why: payload.why,
            whyYou: payload.whyYou,
            theVision: payload.theVision,
            theReach: payload.theReach,
            theMission: payload.theMission,
            whatDoesItDo: payload.whatDoesItDo,
            whomDoesItServe: payload.whomDoesItServe,
            whyShouldItExist: payload.whyShouldItExist,
            defineYourPurpose: payload.defineYourPurpose,
            steps: payload.steps,
            values: payload.values,
            personalities: payload.personalities,
        },
    }, { new: true });
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ERROR_UPDATING_PURPOSE,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Error updating Purpose",
        });
    }
    return response;
});
exports.updatePurposeService = updatePurposeService;
const deletePurposeService = (purposeId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Purpose_model_1.default.findOneAndDelete({ _id: purposeId });
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Record Found ",
        });
    }
    return response;
});
exports.deletePurposeService = deletePurposeService;
