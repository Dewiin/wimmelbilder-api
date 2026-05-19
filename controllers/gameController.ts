import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";

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
    postSubmission,
}