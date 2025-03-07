"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProcessingRequestSchema = new mongoose_1.default.Schema({
    requestId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["processing", "completed", "failed"], default: "processing" },
    createdAt: { type: Date, default: Date.now }
});
const ProcessingRequest = mongoose_1.default.model("ProcessingRequest", ProcessingRequestSchema);
exports.default = ProcessingRequest;
//# sourceMappingURL=ProcessingRequest.js.map