const express = require("express");
const {sendMail} = require("../controllers/email");
const emailsRouter = express.Router();

emailsRouter.post("/sendEmail", sendMail)
module.exports = emailsRouter