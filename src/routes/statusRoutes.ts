import express from "express";
import ProcessingRequest from "../models/ProcessingRequest";

const router = express.Router();

router.get("/:requestId", async (req, res) => {
    try {
        const request = await ProcessingRequest.findOne({ requestId: req.params.requestId });

        if (!request) {
            return res.status(404).json({ message: "Request ID not found" });
        }

        res.status(200).json({ requestId: request.requestId, status: request.status });
    } catch (error) {
        console.error("Error fetching status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;