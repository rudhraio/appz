import logger from "./logger.js";

function successResponse(res, message = "success", data, from = "NA") {
    logger(`[response]: 200 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`);
    return res.status(200).json({
        status: 200,
        message: message,
        data: data
    })
}


function createdResponse(res, message = "created successfull", data, from = "NA") {
    logger(`[response]: 201 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`);

    return res.status(201).json({
        status: 201,
        message: message,
        data: data
    });
}

function badResponse(res, message = "bad request", data, from = "NA") {
    logger(`[response]: 400 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`);

    return res.status(400).json({
        status: 400,
        message: message,
        data: data
    })
}

function unauthorizedResponse(res, message = "Unauthorized", data, from = "NA") {
    logger(`[response]: 403 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`);

    return res.status(403).json({
        status: 403,
        message: message,
        data: data
    })
}

function notFoundResponse(res, message = "not found", data, from = "NA") {
    logger(`[response]: 404 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`);

    return res.status(404).json({
        status: 404,
        message: message,
        data: data
    })
}

function serverErrorResponse(res, message = "unable to process request", data, from = "NA") {
    logger(`[response]: 500 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`);

    return res.status(500).json({
        status: 500,
        message: message,
        data: data
    })
}

export { successResponse, createdResponse, badResponse, notFoundResponse, serverErrorResponse, unauthorizedResponse };