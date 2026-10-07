import express from "express";
import { Request, Response } from "express";
import { router } from "./routes";
const app = express();

app.use(express.json());

app.get("/alive", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Ok",
    upTime: process.uptime(),
  });
});

app.use(router);

export { app };
