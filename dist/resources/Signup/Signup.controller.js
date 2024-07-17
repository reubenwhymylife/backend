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
exports.getAllUsers = exports.disableUserAccount = exports.deleteProfile = exports.editProfile = exports.adminGetUserInfo = exports.getUserInfo = exports.VerifyOtpCode = exports.Register = void 0;
const http_status_codes_1 = require("http-status-codes");
const Signup_model_1 = __importDefault(require("./Signup.model"));
const Signup_service_1 = require("./Signup.service");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const CustomReasons_1 = require("../../utils/CustomReasons");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const registerDto = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        terms: req.body.terms,
        role: req.body.role,
        isDisabled: false
    };
    const response = yield (0, Signup_service_1.RegisterService)(registerDto);
    return res.status(201).success({
        message: CustomReasons_1.Reasons.customedReasons.REGISTRATION_SUCCESSFUL,
        data: response,
    });
});
exports.Register = Register;
const VerifyOtpCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const payload = {
        email: req.body.email,
        otpCode: req.body.otpCode,
    };
    const response = yield (0, Signup_service_1.VerifyOtpCodeService)(payload);
    res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.VERIFICATION_SUCCESS,
        data: [],
    });
});
exports.VerifyOtpCode = VerifyOtpCode;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    let foundUser;
    try {
        foundUser = yield Signup_model_1.default.findById({
            _id: req.session.userId,
        })
            .populate({
            path: "payments",
            select: "paymentRef type",
        })
            .populate({
            path: "subscriptions",
            select: "forMe forOthers totalCost isActive",
        })
            .populate({
            path: "purposes",
        })
            .exec();
    }
    catch (error) {
        console.log(error);
    }
    if (!foundUser) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "User not found",
        });
    }
    const subsFinals = [];
    if (foundUser) {
        for (const item of foundUser === null || foundUser === void 0 ? void 0 : foundUser.subscriptions) {
            let subscriptionData = {
                forMe: {
                    noOfMonth: (_a = item === null || item === void 0 ? void 0 : item.forMe) === null || _a === void 0 ? void 0 : _a.noOfMonths,
                    renewable: (_b = item === null || item === void 0 ? void 0 : item.forMe) === null || _b === void 0 ? void 0 : _b.renewable,
                },
                forOthers: {
                    noOfMonth: (_c = item === null || item === void 0 ? void 0 : item.forOthers) === null || _c === void 0 ? void 0 : _c.noOfMonths,
                    renewable: (_d = item === null || item === void 0 ? void 0 : item.forOthers) === null || _d === void 0 ? void 0 : _d.renewable,
                },
                totalCost: item === null || item === void 0 ? void 0 : item.totalCost,
                isActive: item === null || item === void 0 ? void 0 : item.isActive
            };
            subsFinals.push(subscriptionData);
        }
    }
    res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: {
            id: foundUser._id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: (_e = foundUser.role) !== null && _e !== void 0 ? _e : "",
            payments: foundUser.payments,
            subscriptions: subsFinals,
            purposes: foundUser.purposes,
        },
    });
});
exports.getUserInfo = getUserInfo;
const adminGetUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j, _k;
    let foundUser;
    try {
        foundUser = yield Signup_model_1.default.findById({
            _id: req.query.userId,
        })
            .populate({
            path: "payments",
            select: "paymentRef type",
        })
            .populate({
            path: "subscriptions",
            select: "forMe forOthers totalCost",
        })
            .populate({
            path: "purposes",
        })
            .exec();
    }
    catch (error) {
        console.log(error);
    }
    if (!foundUser) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "User not found",
        });
    }
    const subsFinals = [];
    if (foundUser) {
        for (const item of foundUser === null || foundUser === void 0 ? void 0 : foundUser.subscriptions) {
            let subscriptionData = {
                forMe: {
                    noOfMonth: (_f = item === null || item === void 0 ? void 0 : item.forMe) === null || _f === void 0 ? void 0 : _f.noOfMonths,
                    renewable: (_g = item === null || item === void 0 ? void 0 : item.forMe) === null || _g === void 0 ? void 0 : _g.renewable,
                },
                forOthers: {
                    noOfMonth: (_h = item === null || item === void 0 ? void 0 : item.forOthers) === null || _h === void 0 ? void 0 : _h.noOfMonths,
                    renewable: (_j = item === null || item === void 0 ? void 0 : item.forOthers) === null || _j === void 0 ? void 0 : _j.renewable,
                },
                totalCost: item === null || item === void 0 ? void 0 : item.totalCost,
            };
            subsFinals.push(subscriptionData);
        }
    }
    res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: {
            id: foundUser._id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: (_k = foundUser.role) !== null && _k !== void 0 ? _k : "",
            isVerified: foundUser.isVerified,
            isDisabled: foundUser.isDisabled,
            payments: foundUser.payments,
            subscriptions: subsFinals,
            purposes: foundUser.purposes,
        },
    });
});
exports.adminGetUserInfo = adminGetUserInfo;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    // const founUser = req.body.email;
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isVerified: req.body.isVerified,
    };
    const response = yield (0, Signup_service_1.updateProfileService)(payload);
    res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.UPDATED_SUCCESS,
        data: [],
    });
});
exports.editProfile = editProfile;
const deleteProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield Signup_model_1.default.findById({
        _id: req.query.id,
    }).exec();
    if (!userProfile) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.USER_NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "User not found",
        });
    }
    const response = yield (0, Signup_service_1.deleteUserService)(userProfile._id);
    return res.status(200).success({
        message: "Deleted Successfully",
        data: [],
    });
});
exports.deleteProfile = deleteProfile;
const disableUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const userId = req.body.userId;
    const isDisabled = req.body.isDisabled;
    const response = yield (0, Signup_service_1.disableAccountService)(userId, isDisabled);
    return res.status(200).success({
        message: "Account Updated Successfully",
        data: [],
    });
});
exports.disableUserAccount = disableUserAccount;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, Signup_service_1.allUsersService)();
    return res.status(200).success({
        message: "Data Retrieved",
        data: response,
    });
});
exports.getAllUsers = getAllUsers;
