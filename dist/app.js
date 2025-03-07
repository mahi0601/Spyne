"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const statusRoutes_1 = __importDefault(require("./routes/statusRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/upload", uploadRoutes_1.default);
app.use("/api/status", statusRoutes_1.default);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Spyne Image Processing API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.default = app;
//# sourceMappingURL=app.js.map