import mongoose from "mongoose";

const ProcessingRequestSchema = new mongoose.Schema({
    requestId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["processing", "completed", "failed"], default: "processing" },
    createdAt: { type: Date, default: Date.now }
});

const ProcessingRequest = mongoose.model("ProcessingRequest", ProcessingRequestSchema);

export default ProcessingRequest;
