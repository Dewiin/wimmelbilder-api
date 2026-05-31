import { Router } from "express";
import { gameController } from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.get("/", gameController.getMaps);

gameRouter.get("/:mapName", gameController.getMapAndCharacters);
gameRouter.post("/:mapName", gameController.postSubmission);
gameRouter.post("/:mapName/score", gameController.submitScore);
gameRouter.get("/:mapName/leaderboard", gameController.getLeaderboard);

gameRouter.post("/session/start", gameController.startGameSession);
gameRouter.post("/session/:sessionId/end", gameController.endGameSession);
gameRouter.get("/session/:sessionId", gameController.getSession);