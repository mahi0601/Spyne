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
exports.generateOutputCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const json2csv_1 = require("json2csv");
const generateOutputCSV = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = (0, json2csv_1.parse)(data, { fields: ["serialNumber", "productName", "inputImageUrls", "outputImageUrls"] });
    fs_1.default.writeFileSync("output.csv", csv);
    console.log("✅ Output CSV Generated: output.csv");
});
exports.generateOutputCSV = generateOutputCSV;
//# sourceMappingURL=csvGenerator.js.map