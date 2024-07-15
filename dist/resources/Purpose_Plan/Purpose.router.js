"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Purpose_controller_1 = require("./Purpose.controller");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const router = express_1.default.Router();
router.post("/create-purpose", authentication_middleware_1.authenticateSessionMiddleware, Purpose_controller_1.createPurpose);
router.get("/get-user-purpose", authentication_middleware_1.authenticateSessionMiddleware, Purpose_controller_1.getUserPurpose);
router.get("/get-purpose", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Purpose_controller_1.getAllPurpose);
router.get("/admin-get-purpose", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Purpose_controller_1.adminUserPurpose);
router.put("/update-user-purpose", authentication_middleware_1.authenticateSessionMiddleware, Purpose_controller_1.updateUserPurpose);
router.put("/update-purpose", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Purpose_controller_1.updatePurpose);
router.delete("/delete-purpose", authentication_middleware_1.authenticateSessionMiddleware, authorization_middleware_1.Authorization, Purpose_controller_1.deletePurpose);
exports.default = {
    router: router,
    path: "/user",
};
