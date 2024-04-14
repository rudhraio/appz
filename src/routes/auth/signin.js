import logger from "../../utils/helpers/logger.js"
import UserModel from "../../utils/database/models/user.model.js";
import { badResponse, successResponse } from "../../utils/helpers/response.js";

async function signin(req, res) {
    try {
        const { email, password } = req.body;

        const userModel = new UserModel();
        const user = await userModel.findOne({ email: email.toLowerCase(), deleted: false });
        if (!user) {
            return badResponse(res, "invalid signin credentails");
        }

        const checkPassword = await userModel.comparePassword(password, user.password);
        if (!checkPassword) {
            return badResponse(res, "invalid signin credentails");
        }

        return successResponse(res, "user login successfull")
    } catch (error) {
        logger("[ERR]: ", error);
        res.status(500).json({ status: 500, message: "server error" })
    }
}

export default signin