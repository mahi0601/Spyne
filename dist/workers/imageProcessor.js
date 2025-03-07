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
const sharp_1 = __importDefault(require("sharp"));
const bull_1 = __importDefault(require("bull"));
const ProcessingRequest_1 = __importDefault(require("../models/ProcessingRequest"));
const axios_1 = __importDefault(require("axios"));
const imageQueue = new bull_1.default("image-processing");
const processImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const outputFilePath = filePath.replace(".jpg", "-compressed.jpg");
    yield (0, sharp_1.default)(filePath)
        .resize({ width: 800 })
        .jpeg({ quality: 50 })
        .toFile(outputFilePath);
    return outputFilePath;
});
imageQueue.process((job, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId, filePath } = job.data;
    try {
        const outputPath = yield processImage(filePath);
        yield ProcessingRequest_1.default.findOneAndUpdate({ requestId }, { status: "completed", outputPath });
        yield axios_1.default.post("https://your-webhook-url.com", {
            requestId,
            status: "completed",
            outputImage: outputPath,
        });
        console.log(`✅ Image processed for Request ID: ${requestId}`);
        done();
    }
    catch (error) {
        console.error("❌ Error processing image:", error);
        done(error instanceof Error ? error : new Error(String(error)));
    }
}));
exports.default = imageQueue;
//# sourceMappingURL=imageProcessor.js.map