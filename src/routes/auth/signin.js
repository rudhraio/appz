import logger from "../../utils/helpers/logger.js"
import UserModel from "../../utils/database/models/user.model.js";
import { badResponse, successResponse } from "../../utils/helpers/response.js";
import SpaceModel from "../../utils/database/models/space.model.js";
import UserSpaceModel from "../../utils/database/models/user-space.model.js";

async function signin(req, res) {
    try {
        const { email, password } = req.body;

        const userModel = new UserModel();
        const userSpaceModel = new UserSpaceModel();

        const user = await userModel.findOne({ email: email.toLowerCase(), deleted: false });
        if (!user) {
            return badResponse(res, "invalid signin credentails");
        }

        const checkPassword = await userModel.comparePassword(password, user.password);
        if (!checkPassword) {
            return badResponse(res, "invalid signin credentails");
        }

        console.log("user", user.id);
        const userspace = await userSpaceModel.findOne({
            user: { id: user.id },
            role: "owner"
        });

        const userPayload = {
            uid: user.id
        }

        const rolePayload = {
            role: userspace.role,
            space: userspace.spaceid
        }



        const { access, roleaccess, refresh } = await userModel.generateToken(userPayload, rolePayload, true);

        const responsePayload = {
            uid: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            username: user.username,
            image: user.image,
            space: {
                sid: userspace.spaceid,
                role: "owner",
            },
            access: access,
            refresh: refresh,
            roleaccess: roleaccess
        }

        return successResponse(res, "user login successfull", responsePayload)
    } catch (error) {
        logger("[ERR]: ", error);
        res.status(500).json({ status: 500, message: "server error" })
    }
}

export default signin