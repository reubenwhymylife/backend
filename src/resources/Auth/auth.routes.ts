import express from "express";
const loginRouter = express.Router();
import { Auth, sessionDetails, logOut } from "./auth.controller";
import { authenticateSessionMiddleware } from "../../middleware/authentication.middleware";
loginRouter.post("/login", Auth);
loginRouter.get(
  "/session-details",
  authenticateSessionMiddleware,
  sessionDetails
);
loginRouter.get("/logout", authenticateSessionMiddleware, logOut);
export default {
  router: loginRouter,
  path: "/auth",
};
