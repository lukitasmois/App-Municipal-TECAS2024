const express = require("express");
const emailTemplates = require("../emails/templates");
const {emailQueue} = require("../emails/connection.js");
const {sendMail} = require("../controllers/email");
const emailsRouter = express.Router();

emailsRouter.post("/sendEmail", sendMail);

module.exports = emailsRouter