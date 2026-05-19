import { Router } from "express";
import { gameController } from "../controllers/gameController.js";

export const gameRouter = Router();

gameRouter.post("/:mapName", gameController.postSubmission);