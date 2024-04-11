import app from "./src/app.js";
import env from "./src/utils/configs/env.js";
import logger from "./src/utils/helpers/logger.js";


function init() {
    const PORT = env.port || 3636;

    app.listen(PORT, () => {
        logger("Server Started");
        logger(`Listening on http://localhost:${PORT}`);
    })
}

init();