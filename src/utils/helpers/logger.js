import env from "../configs/env.js";

function logger(...data) {
    if (env?.logger) {
        console.log(`\n[time]: ${new Date()} \n${data}`);
    }
}

export default logger;