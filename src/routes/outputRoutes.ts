import express from "express";
import { downloadProcessedCSV } from "../controllers/outputController";

const router = express.Router();

router.get("/:requestId", downloadProcessedCSV);

export default router;
