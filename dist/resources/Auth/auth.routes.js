"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
const auth_controller_1 = require("./auth.controller");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
loginRouter.post("/login", auth_controller_1.Auth);
loginRouter.get("/session-details", authentication_middleware_1.authenticateSessionMiddleware, auth_controller_1.sessionDetails);
loginRouter.get("/logout", authentication_middleware_1.authenticateSessionMiddleware, auth_controller_1.logOut);
exports.default = {
    router: loginRouter,
    path: "/auth",
};
