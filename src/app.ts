
import express from "express";
import uploadRoutes from "./routes/uploadRoutes";
import statusRoutes from "./routes/statusRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


const app = express();
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/status", statusRoutes);

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
const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

