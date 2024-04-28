import express from "express";
import authRouter from "./auth/auth.router.js";
import authenticator from "../utils/middleware/authenticator.js";
import accountRouter from "./account/account.router.js";


const router = express.Router();

router.use("/auth", authRouter);
router.use("/account", authenticator, accountRouter);

export default router;