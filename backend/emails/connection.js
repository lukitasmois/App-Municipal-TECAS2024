const nodemailer = require("nodemailer")
const Queue = require("bull")
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  secure: false,
  port: "587",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: "localhost",
    port: 6379,
  },
  defaultJobOptions: {
    attempts: 3,
  },
});

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw error;
  }
});

module.exports =  { transporter, emailQueue };