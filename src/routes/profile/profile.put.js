import UserModel from "../../utils/database/models/user.model.js";
import logger from "../../utils/helpers/logger.js";
import { serverErrorResponse, successResponse } from "../../utils/helpers/response.js";

async function profilePut(req, res) {
    try {
        const userModel = new UserModel();
        const user = await userModel.findOne({ id: req.user.uid, deleted: false });
        if (!user) {
            return badResponse(res, "Invalid request");
        }
        const { fname, lname, phonenumber, ccode, image, bio, info } = req.body;

        await userModel.update(user.id, {
            fname, lname, phonenumber, ccode, image, bio, info
        });

        return successResponse(res);
    } catch (error) {
        logger("[ERR]: ", JSON.stringify(error));
        return serverErrorResponse(res);
    }
}

export default profilePut;