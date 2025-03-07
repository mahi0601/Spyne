import express from "express";
import connectDB from "./config/dbConfig";  
import uploadRoutes from "./routes/uploadRoutes";
import statusRoutes from "./routes/statusRoutes";
import errorHandler from "./middleware/errorHandler";
import webhookRoutes from "./routes/webhookRoutes";
import outputRoutes from "./routes/outputRoutes";
import healthRoutes from "./routes/healthRoutes";
const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/output", outputRoutes);
app.use("/api/health", healthRoutes);
app.use(errorHandler);

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Welcome to the Spyne Image Processing API!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
