import logger from "../../utils/helpers/logger.js"
import { createdResponse } from "../../utils/helpers/response.js";

function signup(req, res) {
    try {
        return createdResponse(res, "user created successfull");
    } catch (error) {
        logger("[ERR]: ", error);
        res.status(500).json({ status: 500, message: "server error" })
    }
}

export default signup