import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.js";
import buildRouter from "./routes/build.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/builds", buildRouter);

export default app;