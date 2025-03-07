import { Request, Response } from "express";
import ProcessingRequest from "../models/ProcessingRequest"; 
export const getStatus = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;

        const request = await ProcessingRequest.findOne({ requestId });

        if (!request) {
            return res.status(404).json({ message: "Request ID not found" });
        }

        res.json({ requestId, status: request.status });
    } catch (error) {
        console.error("Status check error:", error);
        res.status(500).json({ message: "Error retrieving status" });
    }
};
