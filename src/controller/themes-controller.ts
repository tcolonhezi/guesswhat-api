import { themes } from "@/data/themes";
import { Request, Response } from "express";

class ThemesController {
  async getThemes(request: Request, response: Response) {
    try {
      return response.status(200).json({ themes });
    } catch (error) {
      console.error("Erro ao obter temas:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ThemesController };
