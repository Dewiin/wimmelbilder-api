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

        const map = await prisma.map.findUnique({
            where: {
                name: mapName,
            }
        });
        if(!map) return res.status(404).json({ error: "Map does not exist!" });

        const characters = await prisma.character.findMany({
            where: {
                mapId: map.id
            },
            select: {
                id: true,
                name: true,
                imageUrl: true
            },
            take: 3
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
            xCoord, 
            yCoord
        }: {
            clientCharacter: Character,
            xCoord: number,
            yCoord: number
        } = req.body
        
        const map = await prisma.map.findUnique({
            where: {
                name: mapName,
            }
        });
        if(!map) return res.status(404).json({ error: "Map does not exist!" });

        const character = await prisma.character.findFirst({
            where: {
                id: clientCharacter.id,
                mapId: map.id
            }
        });
        if(!character) return res.status(404).json({ error: "Character does not exist!" });

        if(
            xCoord >= character.xMin &&
            xCoord <= character.xMax && 
            yCoord >= character.yMin &&
            yCoord <= character.yMax
        ) {
            return res.status(200).json({ message: `Successfully found ${clientCharacter.name}!` });
        }
        
        return res.status(400).json({ error: `That's not ${clientCharacter.name}! Try again.` });
    } catch(err: any) {
        console.error("Error in postSubmission: ", err);
        return res.status(500).json({
            error: "Server error posting submission."
        });
    }
} 

export const gameController = {
    getMaps,
    getMapAndCharacters,
    postSubmission,
}