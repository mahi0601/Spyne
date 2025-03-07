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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAndQueueImages = void 0;
const imageUtils_1 = require("../utils/imageUtils"); // Import from new file
const queueWorker_1 = require("./queueWorker");
// Function to process and compress images before adding them to queue
const processAndQueueImages = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = Date.now().toString();
    try {
        // Process images before adding them to queue
        const processedImages = yield Promise.all(data.map(imageUtils_1.compressImage));
        // Add processed images to queue
        yield (0, queueWorker_1.addJobToQueue)(requestId, processedImages);
        return requestId;
    }
    catch (error) {
        console.error("Error processing images before adding to queue:", error);
        throw error;
    }
});
exports.processAndQueueImages = processAndQueueImages;
//# sourceMappingURL=imageProcessor.js.map