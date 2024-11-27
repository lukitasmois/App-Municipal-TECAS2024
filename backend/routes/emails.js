const express = require("express");
const emailTemplates = require("../emails/templates")
const {emailQueue} = require("../emails/connection.js")
const emailsRouter = express.Router();
const sendMail = require("../controllers/email.js");

emailsRouter.post("/sendEmail", sendMail);

module.exports = emailsRouter