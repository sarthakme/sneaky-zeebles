import sharp from 'sharp';

export async function resize(
    fileName: string,
    width: number,
    height: number
): Promise<sharp.OutputInfo> {
    console.log('Function called');
    const imgName = `res/${fileName}${width}x${height}.jpg`;
    console.log(imgName);
    return await sharp(`res/${fileName}.jpg`)
        .resize(width, height)
        .toFile(imgName);
}
