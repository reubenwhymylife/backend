"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Signup_controller_1 = require("./Signup.controller");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const router = express_1.default.Router();
router.post("/signup", Signup_controller_1.Register);
router.post("/verifyOtp", Signup_controller_1.VerifyOtpCode);
router.get("/info", authentication_middleware_1.authenticateSessionMiddleware, Signup_controller_1.getUserInfo);
router.put("/info", Signup_controller_1.editProfile);
router.put("/account-ban", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Signup_controller_1.disableUserAccount);
router.delete("/info", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Signup_controller_1.deleteProfile);
router.get("/infos", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Signup_controller_1.adminGetUserInfo);
router.get("/all", Signup_controller_1.getAllUsers);
exports.default = {
    router: router,
    path: "/user",
};
