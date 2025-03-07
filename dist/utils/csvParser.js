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
exports.parseCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const parseCSV = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const data = fs_1.default.readFileSync(filePath, "utf8");
    const records = yield new Promise((resolve, reject) => {
        (0, csv_parse_1.parse)(data, { columns: true }, (err, output) => {
            if (err)
                reject(err);
            resolve(output);
        });
    });
    return { valid: true, data: records };
});
exports.parseCSV = parseCSV;
//# sourceMappingURL=csvParser.js.map