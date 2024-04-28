import UserModel from "../../../utils/database/models/user.model.js";
import logger from "../../../utils/helpers/logger.js";
import { badResponse, serverErrorResponse, successResponse } from "../../../utils/helpers/response.js";

async function profileGet(req, res) {
    try {
        const userModel = new UserModel();
        const user = await userModel.findOne({ id: req.user.uid, deleted: false });
        if (!user) {
            return badResponse(res, "Invalid request");
        }
        const payload = {
            fname: user?.fname,
            lname: user?.lname || "",
            email: user?.email,
            phonenumber: user?.phonenumber || "",
            ccode: user?.ccode || 0,
            image: user?.image || "",
            bio: user?.bio || "",
            info: user?.info || {},
            verified: user?.verified,
        }
        return successResponse(res, "User deatils", payload);
    } catch (error) {
        logger("[ERR]: ", JSON.stringify(error));
        return serverErrorResponse(res);
    }
}

export default profileGet;