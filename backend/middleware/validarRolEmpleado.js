const ROL_DEFAULT = "CONTRIBUYENTE"

exports.validarNoContribuyente = (req, res, next) => {
    try {
        const rol  = req.user.rol;
        if (rol !== ROL_DEFAULT) {
           next()
        } else {
        next(res.status(401).json({ error: 'Autorizacion solo para empleados' }))
     } 
    } catch (error) {
        res.status(500).json({error: "Error del servidor"})
       console.log(error);
        
    }    
 }

 exports.asdawd = (req, res, next) => {
    const rol  = req.user.rol;
    if (rol !== ROL_DEFAULT) {
       next()
    } else {
    next(res.status(401).json({ error: 'Autorizacion solo para empleados' }))
 }
 }
//module.exports = validarNoContribuyente
