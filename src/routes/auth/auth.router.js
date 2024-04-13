import express from "express";
import signup from "./signup.js";
import { body } from "express-validator";
import validator from "../../utils/middleware/validator.js";
import signin from "./signin.js";

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



export default authRouter;