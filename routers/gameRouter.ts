import { Router } from "express";
import { gameController } from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.get("/", gameController.getMaps);
gameRouter.post("/start", gameController.startGameSession);
gameRouter.post("/end", gameController.endGameSession);
gameRouter.get("/:mapName", gameController.getMapAndCharacters);
gameRouter.post("/:mapName", gameController.postSubmission);
gameRouter.post("/:mapName/score", gameController.submitScore);
gameRouter.get("/:mapName/leaderboard", gameController.getLeaderboard);