import { prisma } from "../../utils/database/connectDB.js";
import UserModel from "../../utils/database/models/user.model.js";
import logger from "../../utils/helpers/logger.js"
import { badResponse, createdResponse } from "../../utils/helpers/response.js";

async function signup(req, res) {
    try {
        const { name, email, password, agree_to_terms } = req.body;

        if (!agree_to_terms) {
            return badResponse(res, "user must agree to terms & conditions");
        }

        const userModel = new UserModel();

        const userExists = await userModel.exists({ email: email.toLowerCase() });
        if (userExists) {
            return badResponse(res, "user with email already exists.");
        }

        await userModel.create({
            username: email.split("@")[0].toLowerCase(),
            email: email.toLowerCase(),
            fname: name,
            password: await userModel.hashPassword(password)
        });

        return createdResponse(res, "user created successfull");
    } catch (error) {
        logger("[ERR]: ", error);
        res.status(500).json({ status: 500, message: "server error" })
    }
}

export default signup