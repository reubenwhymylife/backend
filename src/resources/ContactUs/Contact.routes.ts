import express from "express";
import {
  createContactUs,
  getAllContacts,
  deleteContact,
} from "./Contact.controller";
import { authenticateSessionMiddleware } from "../../middleware/authentication.middleware";
const router = express.Router();

router.post("/contact-us", createContactUs);
router.get("/get-contact-us", authenticateSessionMiddleware, getAllContacts);
router.delete("/delete-contact-us", authenticateSessionMiddleware, deleteContact);
export default {
  router: router,
  path: "/user",
};
