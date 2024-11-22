const express = require("express");
const emailTemplates = require("../emails/templates")
const {emailQueue} = require("../emails/connection.js")
const emailsRouter = express.Router();


emailsRouter.post("/sendEmail", async (req, res) => {
    const { to, subject, template, params } = req.body;
    try {
        const html = emailTemplates[template](params);
        const job = { to, subject, html };
        await emailQueue.add(job);
        res.status(200).send("Email en la cola para ser enviado");
    } catch (error) {
        console.log (req.body);
        res.status(500).send({ error: error.message });
    }
});

module.exports = emailsRouter