require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const sharp = require('sharp');
const axios = require('axios');
const sendEmail = require('./sendEmail');

const auth = new google.auth.GoogleAuth({
    keyFile: 'service_account.json', 
    scopes: ['https://www.googleapis.com/auth/drive']
});

const drive = google.drive({ version: 'v3', auth });

async function downloadImageFromUrl(url, downloadPath) {
    const writer = fs.createWriteStream(downloadPath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

function wrapText(text, maxCharsPerLine) {
    const words = text.split(" ");
    let lines = [""];

    for (let word of words) {
        let currentLine = lines[lines.length - 1];
        if ((currentLine + " " + word).length > maxCharsPerLine) {
            lines.push(word);
        } else {
            lines[lines.length - 1] = currentLine ? currentLine + " " + word : word;
        }
    }
    return lines;
}

async function updateSvgContent(svgContent, imageUrl, newText, color, size) {
    try {
        const imageLocalPath = path.join(__dirname, 'image.jpg');
        await downloadImageFromUrl(imageUrl, imageLocalPath);

        svgContent = svgContent.replace(/width="[^"]*"/, 'width="1000px"')
            .replace(/height="[^"]*"/, 'height="1000px"')
            .replace(/<image[^>]*>.*?<\/image>/gs, '')
            .replace(/<image[^>]*\/?>/g, '')
            .replace(/<text[^>]*>.*?<\/text>/g, '');

        const imageBuffer = fs.readFileSync(imageLocalPath);
        const imageBase64 = imageBuffer.toString('base64');
        const imageTag = `<image width="100%" height="100%" xlink:href="data:image/jpeg;base64,${imageBase64}"/>`;

        const maxCharsPerLine = 20;
        const lines = wrapText(newText, maxCharsPerLine);
        const lineHeight = size;

        let tspans = lines.map((line, index) =>
            `<tspan x="50%" dy="${index === 0 ? 0 : lineHeight}px">${line}</tspan>`
        ).join("");

        const textTag = `<text x="50%" y="45%" fill="${color}" font-family="Arial, sans-serif" font-size="${size}px" text-anchor="middle" alignment-baseline="middle">${tspans}</text>`;

        svgContent = svgContent.replace('</svg>', `${imageTag}${textTag}</svg>`);

        if (fs.existsSync(imageLocalPath)) {
            fs.unlinkSync(imageLocalPath);
        }

        return svgContent;
    } catch (error) {
        console.error("error, update SVG file:", error.message);
        throw error;
    }
}

async function downloadFileToLocal(fileId, localPath) {
    const res = await drive.files.get({
        fileId: fileId,
        alt: 'media'
    }, { responseType: 'stream' });

    const dest = fs.createWriteStream(localPath);
    res.data.pipe(dest);

    return new Promise((resolve, reject) => {
        dest.on('finish', () => resolve(localPath));
        dest.on('error', (err) => reject(err));
    });
}

async function convertSvgToImage(svgBuffer, outputPath) {
    try {
        await sharp(Buffer.from(svgBuffer))
            .resize(3840, 2160, { fit: 'cover' })
            .toFormat("jpeg")
            .toFile(outputPath);
        return outputPath;
    } catch (error) {
        console.error("error,can't convert SVG file to picture:", error.message);
        throw error;
    }
}

async function uploadImageToDrive(imagePath, fileName) {
    const fileMetadata = {
        name: fileName,
    };

    const media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(imagePath)
    };

    const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    console.log('the picture uploaded success!!:', file.data.id);
    return file.data.id;
}

async function getFileIdByName(fileName) {
    const res = await drive.files.list({
        q: `name='${fileName}' and trashed=false`,
        fields: 'files(id, name)',
    });

    if (res.data.files.length === 0) {
        throw new Error('the file is not exist at the Drive!');
    }

    return res.data.files[0].id;
}

const convertDriveUrl = (originalUrl) => {
    if (!originalUrl) return '/d.jpg';
    const fileIdMatch = originalUrl.match(/[-\w]{25,}/);
    return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000` : originalUrl;
};

async function makeFilePublic(fileId) {
    try {
        await drive.permissions.create({
            resource: {
                type: 'anyone',
                role: 'reader',
            },
            fileId: fileId,
        });
        console.log(`file ${fileId} is now public.`);
    } catch (error) {
        console.error('error at doing the file public', error.message);
    }
}

function cleanupTempFiles(files) {
    files.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
                console.log(`temp file deleted: ${path.basename(filePath)}`);
            } catch (error) {
                console.warn(`not success delete the temp file: ${filePath}`);
            }
        }
    });
}

async function processImage(emailTo, newImageUrl, newText, color, size) {
    const tempFiles = []; 
    
    try {
        console.log('Start the process- create picture...');
        
        newImageUrl = convertDriveUrl(newImageUrl);
        
        console.log('looking for the SVG file...');
        const svgFileId = await getFileIdByName("art2.svg");

        console.log('download SVG file...');
        const svgLocalPath = path.join(__dirname, 'art2.svg');
        tempFiles.push(svgLocalPath);
        await downloadFileToLocal(svgFileId, svgLocalPath);

        console.log('update the picture and the text...');
        const svgContent = fs.readFileSync(svgLocalPath, 'utf-8');
        const updatedSvgContent = await updateSvgContent(svgContent, newImageUrl, newText, color, size);

        console.log('covert to JPEG...');
        const imagePath = path.join(__dirname, 'output.jpg');
        tempFiles.push(imagePath);
        await convertSvgToImage(Buffer.from(updatedSvgContent), imagePath);

        console.log('upload file to Google Drive...');
        const uploadedImageId = await uploadImageToDrive(imagePath, `output_${Date.now()}.jpg`);
        
        await makeFilePublic(uploadedImageId);

        const uploadedImageUrl = `https://drive.google.com/uc?id=${uploadedImageId}`;
        console.log('picture exist at', uploadedImageUrl);
        
        console.log('send email...');
        const mySubject = 'הקסם שלך כאן בפנים!💫💫';
        const myBody = "אנחנו הוקסמנו!! אז איך תשתמש בה...?";
        await sendEmail(emailTo, imagePath, mySubject, myBody);

        console.log('finish and success!');
        
        return uploadedImageUrl;
    } catch (error) {
        console.error('error in process:', error.message);
        throw error;
    } finally {
        cleanupTempFiles(tempFiles);
    }
}

module.exports = { processImage };