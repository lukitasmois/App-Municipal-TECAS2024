const Joi = require("joi");

const esquemaEditarUsuario = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  dni: Joi.string().required(),
  cuil: Joi.string().required(),
  telefono: Joi.string().required(),
  email: Joi.string().required().email(),
  // frenteDNI: Joi.string(),
  // dorsoDNI: Joi.string(),
  // constanciaAFIP: Joi.string(),
});

module.exports = esquemaEditarUsuario;
