import { prisma } from "../connectDB.js";
import BaseModel from "./base.model.js";

class UserSpaceModel extends BaseModel {
    constructor() {
        super(prisma.UserSpaceModel);
    }
}

export default UserSpaceModel;