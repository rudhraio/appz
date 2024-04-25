import jwt from 'jsonwebtoken';

import logger from "../helpers/logger.js";
import { unauthorizedResponse } from "../helpers/response.js";
import env from '../configs/env.js';


const { secret } = env.jwt;

function authenticator(req, res, next) {
    const access = req?.cookies?.access;
    const role = req?.cookies?.role;

    if (!access || !role) {
        return unauthorizedResponse(res, "Unauthorized - token missing");
    }

    jwt.verify(access, secret, (err, user) => {
        if (err) {
            return unauthorizedResponse(res, "Forbidden - Invalid Token");
        }
        jwt.verify(role, secret, (err, role) => {
            if (err) {
                return unauthorizedResponse(res, "Forbidden - Invalid Token");
            }
            req.user = { ...user, ...role };
        });
        next();
    });
}

export default authenticator;