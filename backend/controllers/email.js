const emailTemplates = require("../emails/templates")
const {emailQueue} = require("../emails/connection.js")

const sendMail = async (req, res) => {
    try {
      const { to, subject, template, params } = req.body;
      await sendMailJob({ to, subject, template, params });
      res.status(200).send("Email en la cola para ser enviado");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

const sendMailJob = async ({ to, subject, template, params }) => {
    try {
      const html = emailTemplates[template](params);
      const job = { to, subject, html };
      await emailQueue.add(job);
    } catch (error) {
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  };
  

module.exports = {sendMail, sendMailJob}

