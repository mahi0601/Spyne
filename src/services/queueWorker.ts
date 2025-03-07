import Queue from 'bull';
import { compressImage } from '../utils/imageUtils';
import fs from 'fs';
import path from 'path';

const imageQueue = new Queue('image-processing');

imageQueue.process(async (job, done) => {
    try {
        const { requestId, filePath } = job.data;
        const outputDir = 'compressed_images';
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        
        const outputPath = path.join(outputDir, `${requestId}.jpg`);
        await compressImage(filePath, outputPath);
        
        console.log(`Image processed for request ${requestId}`);
        done();
    } catch (error) {
        console.error('Error processing image:', error);
        done(error instanceof Error ? error : new Error(String(error)));
    }
});
export default imageQueue;