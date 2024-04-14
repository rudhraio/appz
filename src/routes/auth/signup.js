import logger from "../../utils/helpers/logger.js";
import UserModel from "../../utils/database/models/user.model.js";
import { badResponse, createdResponse } from "../../utils/helpers/response.js";
import SpaceModel from "../../utils/database/models/space.model.js";
import UserSpaceModel from "../../utils/database/models/user-space.model.js";

async function signup(req, res) {
    try {
        const { name, email, password, agree_to_terms } = req.body;

        if (!agree_to_terms) {
            return badResponse(res, "user must agree to terms & conditions");
        }

        const userModel = new UserModel();
        const spaceModel = new SpaceModel();
        const userSpaceModel = new UserSpaceModel();

        const userExists = await userModel.exists({ email: email.toLowerCase() });
        if (userExists) {
            return badResponse(res, "user with email already exists.");
        }

        const user = await userModel.create({
            username: email.split("@")[0].toLowerCase(),
            email: email.toLowerCase(),
            fname: name,
            password: await userModel.hashPassword(password)
        });

        const space = await spaceModel.create({
            host: email.split("@")[0].toLowerCase(),
        });

        const userspace = await userSpaceModel.create({
            user: {
                connect: { id: user.id }
            },
            space: {
                connect: { id: space.id }
            },
            role: "owner"
        });

        const userPayload = {
            uid: user.id
        }

        const rolePayload = {
            role: userspace.role,
            space: space.id

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
                sid: space.id,
                role: "owner",
            },
            access: access,
            refresh: refresh,
            roleaccess: roleaccess
        }


        return createdResponse(res, "user created successfull", responsePayload);
    } catch (error) {
        logger("[ERR]: ", error);
        res.status(500).json({ status: 500, message: "server error" })
    }
}

export default signup