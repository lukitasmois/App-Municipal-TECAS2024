const Joi = require("joi")

const esquemaNegocio = Joi.object({
    calle: Joi.string().required(),
    ciudad: Joi.string().required(),
    altura: Joi.string().required(),
    
    //TODO:
    //Definir los rubros
    rubro: Joi.string().required(),

    //TODO: 
    //Guardar la ubicacion de los archivos del titulo de propiedad y del plano
    //titulo:Joi.string().required(),
    //plano:Joi.string().required(),

    //TODO: 
    //Capturar el id del usario desde el token
    
    idUsuario: Joi.string().required(),
})

module.exports = esquemaNegocio