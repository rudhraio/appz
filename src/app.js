import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";


import requestLog from "./utils/middleware/request-log.js";
import router from "./routes/router.js";
import { badResponse, successResponse } from "./utils/helpers/response.js";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true,
}));

// Default route
app.get("/", requestLog, (req, res) => {
    return successResponse(res, "server is up & running");
})

// Health check route
app.get("/ping", (req, res) => {
    return successResponse(res, "ok");
});

app.use("/api", requestLog, router);

app.use("*", requestLog, (req, res) => {
    return badResponse(res, "invalid url")
})

export default app;