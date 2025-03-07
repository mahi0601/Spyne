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
exports.compressImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to download an image from a URL
const downloadImage = (imageUrl, outputPath) => __awaiter(void 0, void 0, void 0, function* () {
    const writer = fs_1.default.createWriteStream(outputPath);
    const response = yield (0, axios_1.default)({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", () => resolve());
        writer.on("error", (error) => reject(error));
    });
});
// Function to compress an image
const compressImage = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tempFilePath = path_1.default.join(__dirname, `temp-${Date.now()}.jpg`);
        const outputFilePath = path_1.default.join(__dirname, `compressed-${Date.now()}.jpg`);
        // Download image from URL
        yield downloadImage(imageUrl, tempFilePath);
        // Compress image
        yield (0, sharp_1.default)(tempFilePath)
            .jpeg({ quality: 50 })
            .toFile(outputFilePath);
        // Remove temporary file after compression
        fs_1.default.unlinkSync(tempFilePath);
        // Return the processed image URL (assumed stored location)
        return `https://your-storage.com/${path_1.default.basename(outputFilePath)}`;
    }
    catch (error) {
        console.error("Error compressing image:", error);
        throw error;
    }
});
exports.compressImage = compressImage;
//# sourceMappingURL=imageUtils.js.map