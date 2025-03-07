import sharp from "sharp";
import fs from "fs";
import Queue from "bull";
import ProcessingRequest from "../models/ProcessingRequest";
import axios from "axios";

const imageQueue = new Queue("image-processing");

const processImage = async (filePath: string) => {
    const outputFilePath = filePath.replace(".jpg", "-compressed.jpg");
    await sharp(filePath)
        .resize({ width: 800 })
        .jpeg({ quality: 50 })
        .toFile(outputFilePath);
    return outputFilePath;
};

imageQueue.process(async (job, done) => {
    const { requestId, filePath } = job.data;
    try {
        const outputPath = await processImage(filePath);
        
        await ProcessingRequest.findOneAndUpdate(
            { requestId },
            { status: "completed", outputPath }
        );

        await axios.post("https://your-webhook-url.com", {
            requestId,
            status: "completed",
            outputImage: outputPath,
        });
        
        console.log(`✅ Image processed for Request ID: ${requestId}`);
        done();
    } catch (error) {
        console.error("❌ Error processing image:", error);
        done(error instanceof Error ? error : new Error(String(error)));
    }
});

export default imageQueue;
