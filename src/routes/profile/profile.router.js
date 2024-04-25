import express from "express";
import profileGet from "./profile.get.js";
import profilePut from "./profile.put.js";
import { body } from "express-validator";
import validator from "../../utils/middleware/validator.js";
import { PHONEREGEX } from "../../utils/helpers/regex.js";

const profileRouter = express.Router();

profileRouter.get("/info", profileGet);


const profileUpdatedata = [
    body('fname').notEmpty().withMessage('First name cannot be empty.'),
    body('lname').optional().isString().withMessage('Last name must be a string.'),
    body('phonenumber').optional().matches(PHONEREGEX).withMessage('Invalid Phone number'),
    body('ccode').optional().isInt().withMessage('Country code must be an integer.'),
    body('image').optional().isString().withMessage('Image URL is invalid.'),
    body('bio').optional().isString().withMessage('Bio field must be a text'),
    body('info').optional().isObject().withMessage('Info must be an object.'),
]
profileRouter.put("/update", validator(profileUpdatedata), profilePut);

export default profileRouter;