import express from "express";
import signup from "./signup.js";
import { body, query } from "express-validator";
import validator from "../../utils/middleware/validator.js";
import signin from "./signin.js";
import resetPassword from "./reset-password.js";
import userVerify from "./user-verify.js";

const authRouter = express.Router();


const signupValidData = [
    body('name').notEmpty().withMessage('Name field cannot be empty.'),
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password field cannot be empty.'),
    body('agree_to_terms').notEmpty().withMessage('Agree to Terms field cannot be empty.').isBoolean().withMessage('Agree to Terms is a boolean field'),
]
authRouter.post("/signup", validator(signupValidData), signup);

const signinValidData = [
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password field cannot be empty.')
]
authRouter.post("/signin", validator(signinValidData), signin);

const resetPasswordValidData = [
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('code').optional().isString().withMessage("Invalid code sent"),
    body('password').optional().isString().withMessage("Invalid password sent")
]
authRouter.post("/reset-password", validator(resetPasswordValidData), resetPassword);


const verifyValidData = [
    query('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    query('code').optional().isString().withMessage('code field must be a string.'),
    query('sendemail').optional().isBoolean().withMessage('sendemail field must be a boolean.')
]
authRouter.get("/verify", validator(verifyValidData), userVerify);

export default authRouter;