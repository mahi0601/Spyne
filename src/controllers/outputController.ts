// src/controllers/outputController.ts
import { Request, Response } from "express";
import fs from "fs";
import { parse } from "json2csv";
import ProcessingRequest from "../models/ProcessingRequest";
import { Document } from "mongoose";

interface ProcessingRequestDocument extends Document {
    requestId: string;
    status: "processing" | "completed" | "failed";
    createdAt: Date;
    productName: string;
    inputImageUrls: string[];
    outputImageUrls: string[];
}

export const downloadProcessedCSV = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params;
        console.log(`🔍 Searching for requestId: ${requestId}`);

        const request = await ProcessingRequest.findOne({ requestId }) as ProcessingRequestDocument;

        if (!request) {
            console.log("❌ Request not found in DB.");
            return res.status(404).json({ message: "Processed data not found" });
        }

        if (request.status !== "completed" || !request.outputImageUrls || request.outputImageUrls.length === 0) {
            console.log("⚠️ Request found but still processing or missing output images.");
            return res.status(400).json({ message: "Processing not completed yet or images not available" });
        }

        console.log("✅ Found processed data:", request);

        const csvData = request.inputImageUrls.map((url: string, index: number) => {
            return {
                serialNumber: index + 1,
                productName: request.productName,
                inputImageUrl: url,
                outputImageUrl: request.outputImageUrls[index] || "Processing..."
            };
        });

        const csv = parse(csvData);
        const filePath = `output-${requestId}.csv`;
        fs.writeFileSync(filePath, csv);

        res.download(filePath, "processed_output.csv", () => {
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error("🔥 Error generating CSV:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};