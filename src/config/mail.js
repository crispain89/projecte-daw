const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "Gmail",
    auth: {
        user: process.env.EMAIL_USER || "macape@fp.insjoaquimmir.cat",
        pass: process.env.EMAIL_PASSWORD || "Macape2001",
    }
  });

module.exports = smtpTransport