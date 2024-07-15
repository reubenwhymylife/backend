"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Dailymessages_controller_1 = require("./Dailymessages.controller");
const router = express_1.default.Router();
router.post("/create-message", Dailymessages_controller_1.createMessages);
router.get("/message-list", Dailymessages_controller_1.getMessages);
router.get("/message", Dailymessages_controller_1.getsingleMessage);
router.put("/message", Dailymessages_controller_1.updateMessage);
router.delete("/message", Dailymessages_controller_1.deleteMessage);
exports.default = {
    router: router,
    path: "/admin",
};
