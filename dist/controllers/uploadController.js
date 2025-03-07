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
const uuid_1 = require("uuid");
const ProcessingRequest_1 = __importDefault(require("../models/ProcessingRequest"));
const bull_1 = __importDefault(require("bull"));
const imageQueue = new bull_1.default('image-processing');
const uploadCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            console.error("❌ No file uploaded");
            return res.status(400).json({ message: "No file uploaded" });
        }
        const requestId = (0, uuid_1.v4)();
        yield ProcessingRequest_1.default.create({ requestId, status: "processing" });
        imageQueue.add({ requestId, filePath: req.file.path });
        console.log(`✅ File uploaded successfully. Request ID: ${requestId}`);
        return res.status(200).json({ requestId, message: "File uploaded successfully" });
    }
    catch (error) {
        console.error("🔥 Error in uploadCSV:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.uploadCSV = uploadCSV;
//# sourceMappingURL=uploadController.js.map