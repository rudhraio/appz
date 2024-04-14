import { prisma } from "../connectDB.js";
import BaseModel from "./base.model.js";

class SpaceModel extends BaseModel {
    constructor() {
        super(prisma.SpaceModel);
    }
}

export default SpaceModel;