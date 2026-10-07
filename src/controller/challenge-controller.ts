import { getSession } from "@/data/session";
import { themes } from "@/data/themes";
import { generateChallenge } from "@/services/gemini";
import { Request, Response } from "express";
import { z } from "zod";

class ChallengeController {
  async createChallenge(request: Request, response: Response) {
    try {
      const bodySchema = z.object({
        sessionId: z.string(),
        theme: z.enum(themes),
      });

      const { sessionId, theme } = bodySchema.parse(request.body);

      const session = getSession(sessionId);
      if (!session) {
        return response.status(404).json({ message: "Session not found" });
      }

      const usedWordsList = [...session.usedWords].join(", ");
      console.log("Palavras já usadas:", usedWordsList);
      const result = await generateChallenge(theme, usedWordsList);

      if (result.word) {
        session.usedWords.add(result.word);
      }

      response.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          message: "Validation error",
          issues: error.issues,
        });
      }
      console.error("Erro ao criar desafio:", error);
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export { ChallengeController };
