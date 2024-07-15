import express, { request } from "express";
import {
  Register,
  deleteProfile,
  editProfile,
  getUserInfo,
  VerifyOtpCode,
  getAllUsers,
  adminGetUserInfo,
  disableUserAccount,
} from "./Signup.controller";
import { authenticateSessionMiddleware } from "../../middleware/authentication.middleware";
import { Authorization } from "../../middleware/authorization.middleware";
const router = express.Router();

router.post("/signup", Register);
router.post("/verifyOtp", VerifyOtpCode);
router.get("/info", authenticateSessionMiddleware, getUserInfo);
router.put("/info", editProfile);
router.put("/account-ban", authenticateSessionMiddleware,
  Authorization, disableUserAccount)
router.delete(
  "/info",
  authenticateSessionMiddleware,
  Authorization,
  deleteProfile
);
router.get(
  "/infos",
  authenticateSessionMiddleware,
  Authorization,
  adminGetUserInfo
);
router.get("/all", getAllUsers);
export default {
  router: router,
  path: "/user",
};
