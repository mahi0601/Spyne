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
exports.addJobToQueue = void 0;
const agenda_1 = __importDefault(require("agenda"));
const imageUtils_1 = require("../utils/imageUtils"); // Updated import
const imageProcessingModel_1 = require("../models/imageProcessingModel");
// MongoDB Connection for Agenda
const mongoConnectionString = "mongodb://localhost:27017/imageProcessing";
const agenda = new agenda_1.default({ db: { address: mongoConnectionString } });
// Define the image processing job
agenda.define("processImages", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId, data } = job.attrs.data;
    try {
        // Process images
        const processedImages = yield Promise.all(data.map(imageUtils_1.compressImage));
        // Save results in MongoDB
        yield (0, imageProcessingModel_1.saveProcessingRequest)(requestId, processedImages);
        console.log(`Processing completed for Request ID: ${requestId}`);
    }
    catch (error) {
        console.error(`Error processing images for Request ID: ${requestId}`, error);
    }
}));
// Function to add a job to the queue
const addJobToQueue = (requestId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield agenda.start();
    yield agenda.now("processImages", { requestId, data });
    console.log(`Job added to queue for Request ID: ${requestId}`);
});
exports.addJobToQueue = addJobToQueue;
// Start agenda processing
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield agenda.start();
        console.log("Agenda job processor started...");
    });
})();
//# sourceMappingURL=queueWorker.js.map