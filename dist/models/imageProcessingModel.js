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
exports.getRequestStatus = exports.saveProcessingRequest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    serial_number: { type: Number, required: true },
    product_name: { type: String, required: true },
    input_images: { type: [String], required: true },
    output_images: { type: [String], default: [] },
});
const ImageProcessingSchema = new mongoose_1.default.Schema({
    request_id: { type: String, required: true, unique: true },
    status: { type: String, enum: ["processing", "completed"], default: "processing" },
    products: { type: [productSchema], required: true },
    webhook_url: { type: String },
    created_at: { type: Date, default: Date.now },
});
const ImageProcessing = mongoose_1.default.model("ImageProcessing", ImageProcessingSchema);
const saveProcessingRequest = (requestId, products, webhook_url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ImageProcessing.create({ request_id: requestId, products, webhook_url });
});
exports.saveProcessingRequest = saveProcessingRequest;
const getRequestStatus = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield ImageProcessing.findOne({ request_id: requestId });
    return record ? record.status : "not found";
});
exports.getRequestStatus = getRequestStatus;
//# sourceMappingURL=imageProcessingModel.js.map