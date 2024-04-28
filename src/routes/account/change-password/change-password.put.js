import UserModel from "../../../utils/database/models/user.model.js";
import logger from "../../../utils/helpers/logger.js";
import { badResponse, notFoundResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "../../../utils/helpers/response.js";

async function changePasswordPut(req, res) {
    try {
        const { cpwd, npwd } = req.body;
        const userModel = new UserModel();

        const user = await userModel.findOne({ id: req.user.uid, deleted: false });

        if (!user) {
            return unauthorizedResponse(res, "Invalid user token sent");
        }

        const checkPassword = await userModel.comparePassword(cpwd, user.password);
        if (!checkPassword) {
            return badResponse(res, "Current password doesn't match");
        }

        const newhashpassword = await userModel.hashPassword(npwd);
        await userModel.update(user.id, {
            password: newhashpassword
        });

        return successResponse(res, "User password updated successfully")
    } catch (error) {
        logger("[ERR]: ", error);
        return serverErrorResponse(res);
    }
}

export default changePasswordPut;   