import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

async function getMaps(req: Request, res: Response) {
    try {
        const maps = await prisma.map.findMany();

        if(!maps) return res.status(404).json({ error: "No maps." });

        return res.status(200).json({
            message: "Successfully fetched maps!",
            maps
        })
    } catch(err: any) {
        console.error("Error in getMaps: ", err);
        return res.status(500).json({
            error: "Server error fetching maps."
        });
    }
}

type SubmissionParams = {
    mapName: string;
};
async function postSubmission(req: Request<SubmissionParams>, res: Response) {
    try {
        const { mapName } = req.params;
        
        const map = await prisma.map.findUnique({
            where: {
                name: mapName,
            }
        });

        if(!map) return res.status(404).json({ error: "Map does not exist." });
        
        return res.status(200).json({
            message: "Placeholder"
        });
    } catch(err: any) {
        console.error("Error in postSubmission: ", err);
        return res.status(500).json({
            error: "Server error posting submission."
        });
    }
} 

export const gameController = {
    getMaps,
    postSubmission,
}