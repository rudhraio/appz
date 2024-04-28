import express from "express";
import { body } from "express-validator";

import validator from "../../../utils/middleware/validator.js";
import changePasswordPut from "./change-password.put.js";

const changePasswordRouter = express.Router();

const changePasswordValidData = [
    body("cpwd").notEmpty().withMessage("Current password is a required field"),
    body("npwd").notEmpty().withMessage("New password is a required field")

]

changePasswordRouter.put("/update", validator(changePasswordValidData), changePasswordPut);


export default changePasswordRouter;