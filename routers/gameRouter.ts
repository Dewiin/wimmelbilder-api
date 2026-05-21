import { Router } from "express";
import { gameController } from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.get("/", gameController.getMaps);
gameRouter.get("/:mapName", gameController.getMapByName);
gameRouter.post("/:mapName", gameController.postSubmission);