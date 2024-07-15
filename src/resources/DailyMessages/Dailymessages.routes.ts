import express from "express";
import {
  createMessages,
  deleteMessage,
  getMessages,
  getsingleMessage,
  updateMessage,
} from "./Dailymessages.controller";
import { updateMessageService } from "./Dailymessages.service";
const router = express.Router();

router.post("/create-message", createMessages);
router.get("/message-list", getMessages);
router.get("/message", getsingleMessage);
router.put("/message", updateMessage);
router.delete("/message", deleteMessage);

export default {
  router: router,
  path: "/admin",
};
