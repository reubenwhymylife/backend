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
exports.deleteContact = exports.getAllContacts = exports.createContactUs = void 0;
const CustomReasons_1 = require("../../utils/CustomReasons");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const Contact_service_1 = require("./Contact.service");
const createContactUs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const payload = {
        userId: sessionId === null || sessionId === void 0 ? void 0 : sessionId.toString(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    };
    const response = yield (0, Contact_service_1.createContactUsService)(payload);
    res.status(200).success({
        message: "Created Successfully",
        data: [],
    });
});
exports.createContactUs = createContactUs;
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, Contact_service_1.allContactus)();
    res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getAllContacts = getAllContacts;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conatactId = req.query.conatactId;
    const response = yield (0, Contact_service_1.deleteContactService)(conatactId);
    res.status(200).success({
        message: "Deteted Successfully ",
        data: [],
    });
});
exports.deleteContact = deleteContact;
