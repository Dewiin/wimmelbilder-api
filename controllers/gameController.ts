import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

type SubmissionParams = {
    mapName: string;
};

type Character = {
    id: string,
    name: string,
    imageUrl: string,
}

const WIN_COUNT = 3

async function getMaps(req: Request, res: Response) {
    try {
        const maps = await prisma.map.findMany();

        if(!maps) return res.status(404).json({ error: "No maps available!" });

        return res.status(200).json({
            message: "Successfully fetched maps!",
            maps
        });
    } catch(err: any) {
        console.error("Error in getMaps: ", err);
        return res.status(500).json({
            error: "Server error fetching maps."
        });
    }
}


async function getMapAndCharacters(req: Request<SubmissionParams>, res: Response) {
    try {
        const { mapName } = req.params;

        const map = await prisma.map.findUnique({ where: { name: mapName } });
        if(!map) return res.status(404).json({ error: "Map does not exist!" });

        const characters = await prisma.character.findMany({
            where: { mapId: map.id },
            select: {
                id: true,
                name: true,
                imageUrl: true
            }
        });
        if(!characters) return res.status(404).json({ error: "No characters found!" })

        return res.status(200).json({
            message: "Map found successfully!",
            map,
            characters
        });
    } catch(err: any) {
        console.error("Error in getMapByName: ", err);
        return res.status(500).json({
            error: "Server error fetching map."
        });
    }
}

async function postSubmission(req: Request<SubmissionParams>, res: Response) {
    try {
        const { mapName } = req.params;
        const { 
            clientCharacter, 
            sessionId,
            xCoord, 
            yCoord
        }: {
            clientCharacter: Character,
            sessionId: string,
            xCoord: number,
            yCoord: number
        } = req.body
        
        const map = await prisma.map.findUnique({ where: { name: mapName }});
        if(!map) return res.status(404).json({ error: "Map does not exist!" });

        const character = await prisma.character.findFirst({ 
            where: { 
                id: clientCharacter.id,
                mapId: map.id 
            } 
        });
        if(!character) return res.status(404).json({ status: "error", error: "Character does not exist!" });
        
        const found = await prisma.foundCharacter.findFirst({
            where: {
                characterId: character.id,
                sessionId,
            },
            include: { character: true }
        });
        if(found) return res.status(200).json({ status: "error", error: `${character.name} has already been found!` });

        if(
            xCoord < character.xMin ||
            xCoord > character.xMax || 
            yCoord < character.yMin ||
            yCoord > character.yMax
        ) {
            return res.status(200).json({ status: "error", message: `That's not ${character.name}! Try again.` });
        }
        
        await prisma.foundCharacter.create({
            data: {
                sessionId,
                characterId: character.id
            }
        }); 
        const foundCount = await prisma.foundCharacter.count({
            where: { sessionId }
        });
        return res.status(200).json({ 
            status: "success", 
            message: `Successfully found ${character.name}!`,
            completed: foundCount >= WIN_COUNT
        });
    } catch(err: any) {
        console.error("Error in postSubmission: ", err);
        return res.status(500).json({
            error: "Server error posting submission."
        });
    }
} 

async function startGameSession(req: Request, res: Response) {
    try {
        const gameSession = await prisma.gameSession.create({});

        return res.status(200).json({
            message: "Game session created!",
            gameSession,
        });
    } catch(err: any) {
        console.error("Error in startGameSession: ", err);
        return res.status(500).json({
            error: "Server error starting game session."
        });
    }
}

async function endGameSession(req: Request, res: Response) {
    try {
        const { sessionId } = req.body;
        const completedAt = new Date();
        
        const gameSession = await prisma.gameSession.findUnique({ where: { id: sessionId } });
        if(!gameSession) return res.status(404).json({ error: "Game session does not exist!" });
        if(gameSession.completedAt) return res.status(400).json({ error: "Game session has already ended!" })
        
        const updatedSession = await prisma.gameSession.update({
            where: { id: sessionId },
            data: { completedAt },
        });

        return res.status(200).json({
            message: "Game session completed!",
            updatedSession,
        });
    } catch(err: any) {
        console.error("Error in endGameSession: ", err);
        return res.status(500).json({
            error: "Server error ending game session."
        });
    }
}

async function submitScore(req: Request, res: Response) {
    try {
        const { sessionId, username } = req.body;
        
        const gameSession = await prisma.gameSession.findUnique({ 
            where: { id: sessionId },
            include: { score: true }
        });
        if(!gameSession) return res.status(404).json({ error: "Game session does not exist!" });
        if(!gameSession.completedAt) return res.status(400).json({ error: "Game session has not completed!" });
        if(gameSession.score) return res.status(400).json({ error: "Game session already has a score!" });
        
        const cleanUsername = username.trim();
        if(!cleanUsername) return res.status(400).json({ error: "Username required!" });
        
        const diffInMs = gameSession.completedAt.getTime() - gameSession.createdAt.getTime();
        await prisma.score.create({
            data: {
                username,
                timeMs: diffInMs,
                sessionId,
            }
        });

        return res.status(200).json({ status: "success", message: `${cleanUsername}'s score has been added!` })
    } catch(err: any) {
        console.error("Error in submitScore: ", err);
        return res.status(500).json({
            error: "Server submitting user score."
        });
    }
}

export const gameController = {
    getMaps,
    getMapAndCharacters,
    postSubmission,
    startGameSession,
    endGameSession,
    submitScore
}