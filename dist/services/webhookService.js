"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerWebhook = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const WEBHOOK_URL = process.env.WEBHOOK_URL || "";
const triggerWebhook = (requestId, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!WEBHOOK_URL) {
        logger_1.default.warn("Webhook URL is not set. Skipping webhook trigger.");
        return;
    }
    const payload = { requestId, status };
    // Retry mechanism - attempts 3 times if webhook fails
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = yield axios_1.default.post(WEBHOOK_URL, payload, {
                headers: { "Content-Type": "application/json" },
                timeout: 5000, // Set timeout to avoid hanging requests
            });
            logger_1.default.info(`Webhook triggered successfully for requestId: ${requestId}, Response: ${response.status}`);
            return; // Exit function on success
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                logger_1.default.error(`Webhook attempt ${attempt} failed for requestId: ${requestId}, Status: ${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status}, Message: ${error.message}`);
            }
            else {
                logger_1.default.error(`Webhook attempt ${attempt} failed for requestId: ${requestId}, Unknown error occurred`);
            }
            if (attempt < 3) {
                logger_1.default.warn(`Retrying webhook... Attempt ${attempt + 1}`);
            }
            else {
                logger_1.default.error(`Webhook failed after 3 attempts for requestId: ${requestId}`);
            }
        }
    }
});
exports.triggerWebhook = triggerWebhook;
//# sourceMappingURL=webhookService.js.map