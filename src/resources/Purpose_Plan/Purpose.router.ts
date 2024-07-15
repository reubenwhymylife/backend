import express from "express";
import {
  createPurpose,
  getUserPurpose,
  updateUserPurpose,
  updatePurpose,
  getAllPurpose,
  deletePurpose,
  adminUserPurpose,
} from "./Purpose.controller";
import { authenticateSessionMiddleware } from "../../middleware/authentication.middleware";
import { Authorization } from "../../middleware/authorization.middleware";
const router = express.Router();

router.post("/create-purpose", authenticateSessionMiddleware, createPurpose);
router.get("/get-user-purpose", authenticateSessionMiddleware, getUserPurpose);
router.get("/get-purpose", authenticateSessionMiddleware, Authorization, getAllPurpose);
router.get("/admin-get-purpose", authenticateSessionMiddleware, Authorization, adminUserPurpose);
router.put("/update-user-purpose", authenticateSessionMiddleware, updateUserPurpose);
router.put("/update-purpose", authenticateSessionMiddleware, Authorization, updatePurpose);
router.delete("/delete-purpose", authenticateSessionMiddleware, Authorization, deletePurpose);
export default {
  router: router,
  path: "/user",
};
