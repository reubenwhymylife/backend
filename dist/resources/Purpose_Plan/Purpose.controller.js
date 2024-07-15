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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurpose = exports.updatePurpose = exports.updateUserPurpose = exports.getAllPurpose = exports.adminUserPurpose = exports.getUserPurpose = exports.createPurpose = void 0;
const CustomReasons_1 = require("../../utils/CustomReasons");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const Purpose_service_1 = require("./Purpose.service");
const createPurpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const payload = {
        userId: sessionId,
        purposeName: req.body.purposeName,
        projectName: req.body.projectName,
        whatIsIt: req.body.whatIsIt,
        why: req.body.why,
        whyYou: req.body.whyYou,
        theVision: req.body.theVision,
        theReach: req.body.theReach,
        theMission: req.body.theMission,
        whatDoesItDo: req.body.whatDoesItDo,
        whomDoesItServe: req.body.whomDoesItServe,
        whyShouldItExist: req.body.whyShouldItExist,
        defineYourPurpose: req.body.defineYourPurpose,
        steps: req.body.steps,
        values: req.body.values,
        personalities: req.body.personalities,
    };
    const response = yield (0, Purpose_service_1.purposeService)(payload);
    return res.status(200).success({
        message: "PURPOSE_CREATED_SUCCESSFULLY",
        data: [],
    });
});
exports.createPurpose = createPurpose;
const getUserPurpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const response = yield (0, Purpose_service_1.getUserPurposeService)(sessionId);
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getUserPurpose = getUserPurpose;
const adminUserPurpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purposeId = req.query.purposeId;
    const response = yield (0, Purpose_service_1.adminGetUserPurpose)(purposeId);
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.adminUserPurpose = adminUserPurpose;
const getAllPurpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, Purpose_service_1.getAllPurposeService)();
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getAllPurpose = getAllPurpose;
const updateUserPurpose = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const payload = {
        userId: sessionId,
        purposeName: req.body.purposeName,
        projectName: req.body.projectName,
        whatIsIt: req.body.whatIsIt,
        why: req.body.why,
        whyYou: req.body.whyYou,
        theVision: req.body.theVision,
        theReach: req.body.theReach,
        theMission: req.body.theMission,
        whatDoesItDo: req.body.whatDoesItDo,
        whomDoesItServe: req.body.whomDoesItServe,
        whyShouldItExist: req.body.whyShouldItExist,
        defineYourPurpose: req.body.defineYourPurpose,
        steps: req.body.steps,
        values: req.body.values,
        personalities: req.body.personalities,
    };
    Purpose_service_1.updateUserPurposeService;
    const response = yield (0, Purpose_service_1.updateUserPurposeService)(sessionId, payload);
    return res.status(200).success({
        message: "PURPOSE_UPDATED_SUCCESSFULLY",
        data: response,
    });
});
exports.updateUserPurpose = updateUserPurpose;
// update purpose via id
const updatePurpose = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const purposeId = req.query.purposeId;
    const payload = {
        purposeName: req.body.purposeName,
        projectName: req.body.projectName,
        whatIsIt: req.body.whatIsIt,
        why: req.body.why,
        whyYou: req.body.whyYou,
        theVision: req.body.theVision,
        theReach: req.body.theReach,
        theMission: req.body.theMission,
        whatDoesItDo: req.body.whatDoesItDo,
        whomDoesItServe: req.body.whomDoesItServe,
        whyShouldItExist: req.body.whyShouldItExist,
        defineYourPurpose: req.body.defineYourPurpose,
        steps: req.body.steps,
        values: req.body.values,
        personalities: req.body.personalities,
    };
    const response = yield (0, Purpose_service_1.updatePurposeService)(purposeId, payload);
    return res.status(200).success({
        message: "PURPOSE_UPDATED_SUCCESSFULLY",
        data: response,
    });
});
exports.updatePurpose = updatePurpose;
const deletePurpose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purposeId = req.query.purposeId;
    const response = yield (0, Purpose_service_1.deletePurposeService)(purposeId);
    return res.status(200).success({
        message: "Purpose Deleted Successfully",
        data: response,
    });
});
exports.deletePurpose = deletePurpose;
