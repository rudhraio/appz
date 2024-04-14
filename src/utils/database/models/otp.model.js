import { prisma } from "../connectDB.js";
import BaseModel from "./base.model.js";

class OtpModel extends BaseModel {
    constructor() {
        super(prisma.OtpModel);
    }
}

export default OtpModel;