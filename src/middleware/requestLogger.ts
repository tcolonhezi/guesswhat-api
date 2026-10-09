import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status,
      duration: `${duration}ms`,
      origin: req.get("origin") ?? "unknown",
      ip: req.ip,
      body: req.body,
    };

    if (status >= 400) {
      console.warn("[REQUEST REJECTED]", log);
    } else {
      console.info("[REQUEST ACCEPTED]", log);
    }
  });

  next();
}
