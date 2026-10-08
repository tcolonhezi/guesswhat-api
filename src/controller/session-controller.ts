import { Request, Response } from "express";
import { createSession } from "../data/session";

class SessionController {
  async session(request: Request, response: Response) {
    try {
      const sessionId = createSession();
      response.status(200).json({ sessionId });
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { SessionController };
