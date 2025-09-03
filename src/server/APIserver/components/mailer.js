const nodemailer = require("nodemailer");
const { objOTPModel } = require('../mongoSchema/otp');
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

const sendMail = async (to, subject, text, html = null) => {
    try{
        var OTP = Math.floor(100000 + Math.random() * 900000);
        const mailContent = {
            from: "angel.rags04@gmail.com",
            to: "tamilselvanpsg16u253@gmail.com",
            subject: "Your OTP Code",
            text: `Your OTP is ${OTP}. It will expire in 5 minutes.`
        }
        await transporter.sendMail(mailContent);
        return OTP;
    } catch(err) {
        throw err;
    }
}

module.exports = { sendMail };