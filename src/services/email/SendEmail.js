const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SENDER_EMAIL_HOSTNAME,
  port: process.env.SENDER_EMAIL_PORT,
  auth: {
    user: process.env.SENDER_EMAIL_ID,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

const SendEmail = async (receiver, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Falaj" <${process.env.SENDER_EMAIL_ID}>`,
      to: receiver,
      subject: subject,
      text: text,
    });
    return info?.messageId;
  } catch (error) {
    return error?.message;
  }
};

module.exports = { SendEmail };
