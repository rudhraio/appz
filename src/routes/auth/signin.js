import logger from "../../utils/helpers/logger.js"
import { successResponse } from "../../utils/helpers/response.js";

function signin(req, res) {
    try {
        return successResponse(res, "user login successfull")
    } catch (error) {
        logger("[ERR]: ", error);
        res.status(500).json({ status: 500, message: "server error" })
    }
}

export default signin