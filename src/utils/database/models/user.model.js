import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../connectDB.js";
import BaseModel from "./base.model.js";
import env from "../../configs/env.js";

class UserModel extends BaseModel {
    constructor() {
        super(prisma.UserModel);
    };

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    };

    async generateToken(user, role, isrefresh = false) {
        let token = {};
        token.access = jwt.sign(user, env.jwt.secret, { expiresIn: env.jwt.exp });
        token.roleaccess = jwt.sign(role, env.jwt.secret, { expiresIn: env.jwt.exp });
        if (isrefresh) {
            token.refresh = jwt.sign({ uid: user.uid }, env.jwt.refreshsecret, { expiresIn: env.jwt.refreshexp });
        }

        return token;
    };
}

export default UserModel;