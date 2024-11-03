const Negocio = require("../models/negocio")

const crearNegocio = async (req, res) =>{
    console.log("aaaa", req.body);
    
    const { 
        calle, 
        ciudad, 
        altura, 
        rubro, 
        titulo,
        plano, 
        idUsuario} = req.body

        const negocio = new Negocio({
            calle, 
            ciudad, 
            altura, 
            rubro, 
            titulo,
            plano, 
            idUsuario
        })

        try {
            await negocio.save()
            res.json({mensaje: "Neogico creado"})
        } catch (error) {
            res.status(500).json({ mensaje: `Error al crear el negocio`});
        }
}


module.exports = crearNegocio