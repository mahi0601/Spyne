import { Request, Response } from "express";

export const processWebhook = async (req: Request, res: Response) => {
    try {
        console.log("📩 Webhook Received:", req.body);

        const { requestId, status, outputImages } = req.body;

        if (!requestId || !status || !outputImages) {
            return res.status(400).json({ message: "Invalid webhook payload" });
        }

        // Here, you can process the webhook data and trigger further actions
        console.log(`✅ Webhook processed for Request ID: ${requestId}`);

        return res.status(200).json({ message: "Webhook received successfully" });
    } catch (error) {
        console.error("🔥 Error processing webhook:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
