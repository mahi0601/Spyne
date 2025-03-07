import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ProcessingRequest from '../models/ProcessingRequest';
import Queue from 'bull';

const imageQueue = new Queue('image-processing');
export const uploadCSV = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            console.error("❌ No file uploaded");
            return res.status(400).json({ message: "No file uploaded" });
        }

        const requestId = uuidv4();
        await ProcessingRequest.create({ requestId, status: "processing" });

        imageQueue.add({ requestId, filePath: req.file.path });

        console.log(`✅ File uploaded successfully. Request ID: ${requestId}`);
        return res.status(200).json({ requestId, message: "File uploaded successfully" });

    } catch (error) {
        console.error("🔥 Error in uploadCSV:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
