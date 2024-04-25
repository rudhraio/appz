import express from "express";
import authRouter from "./auth/auth.router.js";
import profileRouter from "./profile/profile.router.js";
import authenticator from "../utils/middleware/authenticator.js";


const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", authenticator, profileRouter);

export default router;