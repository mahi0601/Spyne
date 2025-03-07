import axios from "axios";
import logger from "../utils/logger";
import dotenv from "dotenv";

dotenv.config(); 

const WEBHOOK_URL = process.env.WEBHOOK_URL || "";

export const triggerWebhook = async (requestId: string, status: string) => {
  if (!WEBHOOK_URL) {
    logger.warn("Webhook URL is not set. Skipping webhook trigger.");
    return;
  }

  const payload = { requestId, status };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await axios.post(WEBHOOK_URL, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 5000, // Set timeout to avoid hanging requests
      });

      logger.info(
        `Webhook triggered successfully for requestId: ${requestId}, Response: ${response.status}`
      );
      return; // Exit function on success
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        logger.error(
          `Webhook attempt ${attempt} failed for requestId: ${requestId}, Status: ${error.response?.status}, Message: ${error.message}`
        );
      } else {
        logger.error(
          `Webhook attempt ${attempt} failed for requestId: ${requestId}, Unknown error occurred`
        );
      }

      if (attempt < 3) {
        logger.warn(`Retrying webhook... Attempt ${attempt + 1}`);
      } else {
        logger.error(`Webhook failed after 3 attempts for requestId: ${requestId}`);
      }
    }
  }
};
