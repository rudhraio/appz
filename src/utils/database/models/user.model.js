import bcrypt from "bcrypt";
import { prisma } from "../connectDB.js";
import BaseModel from "./base.model.js";


class UserModel extends BaseModel {
    constructor() {
        super(prisma.UserModel);
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default UserModel;