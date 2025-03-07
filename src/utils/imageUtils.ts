import sharp from 'sharp';

export const compressImage = async (inputPath: string, outputPath: string) => {
    try {
        await sharp(inputPath)
            .resize({ width: 800 })
            .toFormat('jpeg', { quality: 50 })
            .toFile(outputPath);
        return outputPath;
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
};
