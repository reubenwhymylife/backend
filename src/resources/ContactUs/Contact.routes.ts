import express from "express";
import {
  createContactUs,
  getAllContacts,
  deleteContact,
} from "./Contact.controller";
const router = express.Router();

router.post("/contact-us", createContactUs);
router.get("/get-contact-us", getAllContacts);
router.delete("/delete-contact-us", deleteContact);
export default {
  router: router,
  path: "/user",
};
