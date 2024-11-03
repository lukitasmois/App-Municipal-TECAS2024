const Joi = require("joi")

const esquemaNegocio = Joi.object({
    calle: Joi.string().required(),
    ciudad: Joi.string().required(),
    altura: Joi.string().required(),
    
    //TODO:
    //Definir los rubros
    rubro: Joi.string().required(),

    //TODO: 
    //Guardar la ubicacion de los archivos
    titulo:Joi.string().required(),
    
    idUsuario: Joi.string().required(),
})

module.exports = esquemaNegocio