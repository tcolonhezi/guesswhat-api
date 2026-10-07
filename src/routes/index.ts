import { Router } from "express";
import { ChallengeController } from "../controller/challenge-controller";
import { SessionController } from "@/controller/session-controller";
import { ThemesController } from "@/controller/themes-controller";

const router = Router();
const challengeController = new ChallengeController();
const sessionController = new SessionController();
const themesController = new ThemesController();

router.post("/challenge", challengeController.createChallenge);
router.post("/session", sessionController.session);
router.get("/themes", themesController.getThemes);

export { router };
