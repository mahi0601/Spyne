import express from "express";
import { processWebhook } from "../controllers/webhookController";

const router = express.Router();

router.post("/", processWebhook);

export default router;