import logger from "../helpers/logger.js";

function requestLog(req, res, next) {
    logger(`[Request] \n[IP]: ${req.ip} \n[method]: ${req.method} \n[headers]: ${JSON.stringify(req.headers)} \n[data]: ${JSON.stringify(req?.body)} \n[url]: ${req.url} \n`)
    return next();
}

export default requestLog;