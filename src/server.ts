import express from "express";
import connectDB from "./config/dbConfig";  
import uploadRoutes from "./routes/uploadRoutes";
import statusRoutes from "./routes/statusRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/status", statusRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
