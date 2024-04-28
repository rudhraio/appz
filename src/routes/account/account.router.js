import express from "express";
import profileRouter from "./profile/profile.router.js";
import changePasswordRouter from "./change-password/change-password.router.js";

const accountRouter = express.Router();

accountRouter.use("/profile", profileRouter);
accountRouter.use("/change-password", changePasswordRouter)

export default accountRouter;