"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_controller_1 = require("./Contact.controller");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
const router = express_1.default.Router();
router.post("/contact-us", Contact_controller_1.createContactUs);
router.get("/get-contact-us", authentication_middleware_1.authenticateSessionMiddleware, Contact_controller_1.getAllContacts);
router.delete("/delete-contact-us", authentication_middleware_1.authenticateSessionMiddleware, Contact_controller_1.deleteContact);
exports.default = {
    router: router,
    path: "/user",
};
