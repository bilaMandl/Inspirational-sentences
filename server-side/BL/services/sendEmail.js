const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { config } = require('dotenv');

async function sendEmail(recipientEmail, filePath, subject, text) {
    const senderEmail = config().parsed.EMAIL_USER;
    const password = config().parsed.EMAIL_PASS;

    const configurations = [
        {
            name: "Gmail - TLS מבוטל",
            config: {
                service: "gmail",
                auth: { user: senderEmail, pass: password },
                tls: { rejectUnauthorized: false },
                secure: false
            }
        },
        {
            name: "Gmail - SMTP ידני",
            config: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: { user: senderEmail, pass: password },
                tls: { 
                    rejectUnauthorized: false,
                    ciphers: 'SSLv3'
                }
            }
        },
        {
            name: "Gmail - Port 465",
            config: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: { user: senderEmail, pass: password },
                tls: { rejectUnauthorized: false }
            }
        }
    ];

    const mailOptions = {
        from: `"צוות איידיבליזי מג'יק"`,
        to: recipientEmail,
        subject: subject,
        html: text,
    };

    if (filePath && fs.existsSync(filePath)) {
        try {
            const attachment = fs.readFileSync(filePath);
            mailOptions.attachments = [{
                filename: path.basename(filePath),
                content: attachment
            }];
        } catch (fileError) {
            console.warn(`problem in reading file: ${fileError.message}`);
        }
    }

    for (let i = 0; i < configurations.length; i++) {
        const { name, config } = configurations[i];
        console.log(`trying ${name}...`);
        
        try {
            const transporter = nodemailer.createTransport(config);
            
            await transporter.verify();
            console.log(`conncet to-${name} success!`);
            
            const info = await transporter.sendMail(mailOptions);
            console.log(`the email send success in way ${name}!`, info.messageId);
            return info;
            
        } catch (error) {
            console.error(`${name} failed: ${error.message}`);
            if (i === configurations.length - 1) {
                throw new Error("all trying to send email faild.");
            }
        }
    }
}

module.exports = sendEmail;