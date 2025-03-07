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
exports.uploadCSV = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const ProcessingRequest_1 = __importDefault(require("../models/ProcessingRequest")); // Import the MongoDB model
const upload = (0, multer_1.default)({ dest: "uploads/" });
const uploadCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const requestId = (0, uuid_1.v4)(); // Generate a unique request ID
        // Store request ID and initial status in MongoDB
        yield ProcessingRequest_1.default.create({ requestId, status: "processing" });
        // Process the CSV asynchronously (mocked here for simplicity)
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield ProcessingRequest_1.default.findOneAndUpdate({ requestId }, { status: "completed" });
        }), 5000); // Simulate async processing
        res.status(200).json({ requestId, message: "CSV uploaded, processing started." });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Error processing file" });
    }
});
exports.uploadCSV = uploadCSV;
//# sourceMappingURL=uploadController.js.map