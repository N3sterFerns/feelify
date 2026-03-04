const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY, 
});

async function uploadFile({buffer, filename, folder=""}) {
    try {

        const response = await client.files.upload({
            file: await ImageKit.toFile(Buffer.from(buffer)),
            fileName: filename,
            folder
        });

        return response
    } catch (error) {
        console.log(error)
    }
}


module.exports = {uploadFile}