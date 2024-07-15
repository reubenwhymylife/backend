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
exports.deleteMessageService = exports.updateMessageService = exports.getSingleMessage = exports.getMessageService = exports.messageService = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const CustomReasons_1 = require("../../utils/CustomReasons");
const Dailymessages_model_1 = __importDefault(require("./Dailymessages.model"));
const messageService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let newMessage;
    for (const message of payload) {
        newMessage = new Dailymessages_model_1.default(message);
        yield newMessage.save();
    }
    if (!newMessage) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.ERROR_CREATING_MESSAGE,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Error creating message",
        });
    }
    return newMessage;
});
exports.messageService = messageService;
const getMessageService = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Dailymessages_model_1.default.find();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Data Found",
        });
    }
    return response;
});
exports.getMessageService = getMessageService;
const getSingleMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Dailymessages_model_1.default.findOne({ _id: messageId }).exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Data Found",
        });
    }
    return response;
});
exports.getSingleMessage = getSingleMessage;
const updateMessageService = (messageId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Dailymessages_model_1.default.findOneAndUpdate({ _id: messageId }, {
        $set: {
            section1: payload.section1,
            section2: payload.section2,
            date: payload.date,
        },
    }, { new: true });
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Data Found",
        });
    }
    return response;
});
exports.updateMessageService = updateMessageService;
const deleteMessageService = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Dailymessages_model_1.default.findOneAndDelete({
        _id: messageId,
    }).exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "No Data Found",
        });
    }
    return response;
});
exports.deleteMessageService = deleteMessageService;
