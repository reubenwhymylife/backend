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
exports.deleteMessage = exports.updateMessage = exports.getsingleMessage = exports.getMessages = exports.createMessages = void 0;
const CustomReasons_1 = require("../../utils/CustomReasons");
const Dailymessages_service_1 = require("./Dailymessages.service");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const createMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const payload = {
        section1: req.body.section1,
        section2: req.body.section2,
        date: req.body.date,
    };
    const response = yield (0, Dailymessages_service_1.messageService)([payload]);
    return res.status(200).success({
        message: "MESSAGE_CREATED_SUCCESSFULLY",
        data: response,
    });
});
exports.createMessages = createMessages;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, Dailymessages_service_1.getMessageService)();
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getMessages = getMessages;
const getsingleMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messageId = req.query.messageId;
    const response = yield (0, Dailymessages_service_1.getSingleMessage)(messageId);
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getsingleMessage = getsingleMessage;
const updateMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const messageId = req.query.messageId;
    if (!messageId) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Message ID is required",
        });
    }
    const payload = {
        section1: req.body.section1,
        section2: req.body.section2,
        date: req.body.date,
    };
    const response = yield (0, Dailymessages_service_1.updateMessageService)(messageId, payload);
    return res.status(200).success({
        message: "MESSAGE_UPDATED_SUCCESSFULLY",
        data: response,
    });
});
exports.updateMessage = updateMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messageId = req.query.messageId;
    const response = yield (0, Dailymessages_service_1.deleteMessageService)(messageId);
    return res.status(200).success({
        message: "Message Deleted Successfully",
        data: [],
    });
});
exports.deleteMessage = deleteMessage;
