import express from "express";
import { Request, Response } from "express";
import { router } from "./routes";
import cors from "cors";
import { env } from "./util/env";
import helmet from "helmet";

const allowedOrigins = env.ALLOWED_ORIGINS;

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1); // trust first proxy
app.use(helmet());

app.use(express.json());
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST"] }));
app.use(express.json({ limit: "2kb" }));

app.get("/alive", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Ok",
    upTime: process.uptime(),
  });
});

app.use(router);

export { app };
