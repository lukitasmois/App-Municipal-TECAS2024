const habilitacion = require("../models/habilitacion");
const negocio = require("../controllers/negocio")
//metodo que permite crear una habilitación
const crearHabilitacion = async (req, res) => {
    let idNegocio = req.body.idNegocio
    console.log(idNegocio)
    const nuevaHabilitacion = new habilitacion({
        IdNegocio: idNegocio,
        estado: "iniciado",
    })
    try{ 
        console.log(nuevaHabilitacion)
        await nuevaHabilitacion.save();
        await negocio.agregarHabilitacion(idNegocio, nuevaHabilitacion._id);
        res.status(201).json({ message: "habilitacion creada exitosamente:", habilitacion: nuevaHabilitacion });
     }
     catch(err){
        console.log(err)
        res.status(500).json("No se pudo guardar la habilitación" + req.body.idNegocio);
     }
}

module.exports = { crearHabilitacion };