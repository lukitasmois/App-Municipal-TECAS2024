const esquemaNegocio = require("../esquemas/esquemaNegocio")

const validarNegocio = (req, res, next) => {  
    const { error } = esquemaNegocio.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  module.exports = validarNegocio