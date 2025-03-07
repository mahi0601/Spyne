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
const bull_1 = __importDefault(require("bull"));
const imageUtils_1 = require("../utils/imageUtils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imageQueue = new bull_1.default('image-processing');
imageQueue.process((job, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestId, filePath } = job.data;
        const outputDir = 'compressed_images';
        if (!fs_1.default.existsSync(outputDir))
            fs_1.default.mkdirSync(outputDir);
        const outputPath = path_1.default.join(outputDir, `${requestId}.jpg`);
        yield (0, imageUtils_1.compressImage)(filePath, outputPath);
        console.log(`Image processed for request ${requestId}`);
        done();
    }
    catch (error) {
        console.error('Error processing image:', error);
        done(error instanceof Error ? error : new Error(String(error)));
    }
}));
exports.default = imageQueue;
//# sourceMappingURL=queueWorker.js.map