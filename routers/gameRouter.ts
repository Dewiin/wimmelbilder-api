import { Router } from "express";
import { gameController } from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.get("/", gameController.getMaps);
gameRouter.post("/start", gameController.startGameSession);
gameRouter.post("/end", gameController.endGameSession);
gameRouter.post("/score", gameController.submitScore);
gameRouter.get("/:mapName", gameController.getMapAndCharacters);
gameRouter.post("/:mapName", gameController.postSubmission);