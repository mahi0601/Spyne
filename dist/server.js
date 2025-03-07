"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const statusRoutes_1 = __importDefault(require("./routes/statusRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, dbConfig_1.default)();
app.use(express_1.default.json());
app.use("/api/upload", uploadRoutes_1.default);
app.use("/api/status", statusRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map