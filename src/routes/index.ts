import { Router } from "express";
import { ChallengeController } from "../controller/challenge-controller";
import { SessionController } from "@/controller/session-controller";
import { ThemesController } from "@/controller/themes-controller";
import { rateLimit } from "express-rate-limit";

const challengeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
  message: "Too many requests from this IP, please try again after a minute",
});
const sessionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
  message: "Too many requests from this IP, please try again after a minute",
});

const router = Router();
const challengeController = new ChallengeController();
const sessionController = new SessionController();
const themesController = new ThemesController();

router.post(
  "/challenge",
  challengeLimiter,
  challengeController.createChallenge,
);
router.post("/session", sessionLimiter, sessionController.session);
router.get("/themes", themesController.getThemes);

export { router };
