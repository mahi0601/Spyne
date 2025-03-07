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
const express_1 = __importDefault(require("express"));
const ProcessingRequest_1 = __importDefault(require("../models/ProcessingRequest"));
const router = express_1.default.Router();
router.get("/:requestId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield ProcessingRequest_1.default.findOne({ requestId: req.params.requestId });
        if (!request) {
            return res.status(404).json({ message: "Request ID not found" });
        }
        res.status(200).json({ requestId: request.requestId, status: request.status });
    }
    catch (error) {
        console.error("Error fetching status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
//# sourceMappingURL=statusRoutes.js.map