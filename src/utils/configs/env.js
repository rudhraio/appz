import dotenv from 'dotenv';
dotenv.config();

import dev from "./dev.js";
import prod from './prod.js';

const environments = {
    dev: dev,
    prod: prod
}
const currentEnv = process.env.NODE_ENV || 'dev';
const env = environments[currentEnv];

export default env;