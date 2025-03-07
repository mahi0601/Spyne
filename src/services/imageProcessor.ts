import imageQueue from '../services/queueWorker';

export const processAndQueueImages = async (requestId: string, filePath: string) => {
    try {
        await imageQueue.add({ requestId, filePath });
        console.log(`Queued image processing for ${requestId}`);
    } catch (error) {
        console.error('Error adding image processing job:', error);
        throw error;
    }
};