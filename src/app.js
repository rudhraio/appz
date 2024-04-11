import express from "express";
import requestLog from "./utils/middleware/request-log.js";

const app = express();
app.use(express.json());


// Default route
app.get("/", requestLog, (req, res) => {
    res.status(200).json({ status: 200, message: "server is up & running" });
})

// Health check route
app.get("/ping", (req, res) => {
    res.status(200).json({ status: 200, message: "ok" });
})

export default app;