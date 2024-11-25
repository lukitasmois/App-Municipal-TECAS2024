const Negocio = require("../models/negocio")
//Para chequear la prefactibilidad requiero acceder a los negocios
const Habilitacion = require("../models/habilitacion");
//metodo que permite crear una habilitación
const crearHabilitacion = async (req, res) => {
    let idNegocio = req.body.idNegocio
    console.log(idNegocio)
    const nuevaHabilitacion = new Habilitacion({
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

//Metodo para asignar numero de expediente a habilitacion

const setExpediente = async (req,res) => {
  console.log('PEDIDO EXPEDIENTE '+req.body.newExpediente)
  //Busco una habilitación que ya tenga el número de legajo a asignar
  const existing_hab = await Habilitacion.findOne({num_expendiente: req.body.newExpediente});
  //Si no existe una con el número de legajo que quiero asignar
  if(existing_hab === null){
        //Traigo ID de negocio relacionado con la habilitacion
        try{
          const aux_h = await Habilitacion.findById(req.body.id);
          var id_negocio = aux_h.IdNegocio;
          //Traigo negocio por ID
          const b_negocio = await Negocio.findById(id_negocio);
          //Chequeo prefactibilidad
          if(b_negocio.planosAprobados && b_negocio.negocioAprobado){
            console.log("PREFACTIBILIDAD APROBDA");
            //Traigo la habilitación por ID y le asigno el número de legajo
            try{
            console.log(aux_h.id);
            const habilitacion = await Habilitacion.findByIdAndUpdate(aux_h.id,{
              num_expediente : req.body.newExpediente
            });
            }catch(error){
              console.log(error);
            };
            res.json({status:'Expediente asignado'});
          }else{
            //console.log(id_negocio);
            res.json({status:'El negocio todavía no pasó la prefactibilidad'});
          }
        }catch{
          res.json({status:
            'No se pudo procesar la petición' + ' ' + req.body.id + ' ' + req.body.newExpediente
          });
        }
  }else{
    //Tira error si ya existe habilitación con nuevo número de legajo
    res.json({status:'Ya existe una habilitacion el número de expediente: '+req.body.newExpediente});
  }
}



//Metodo para asignar número de legajo a una habilitación


const setLegajo = async (req,res) => {
  console.log('PEDIDO LEGAJO')
  //Busco una habilitación que ya tenga el número de legajo a asignar
  const existing_hab = await Habilitacion.findOne({NroLegajo: req.body.newLegajo});
  //Si no existe una con el número de legajo que quiero asignar
  if(existing_hab === null){
        //Traigo ID de negocio relacionado con la habilitacion
        try{
          const aux_h = await Habilitacion.findById(req.body.id);
          var id_negocio = aux_h.IdNegocio;
          //Traigo negocio por ID
          const b_negocio = await Negocio.findById(id_negocio);
          //Chequeo prefactibilidad
          if(b_negocio.planosAprobados && b_negocio.negocioAprobado){
            console.log("PREFACTIBILIDAD APROBDA");
            //Traigo la habilitación por ID y le asigno el número de legajo
            const habilitacion = await Habilitacion.findByIdAndUpdate(aux_h.id,{
              NroLegajo : req.body.newLegajo
            });
            res.json({status:'Legajo asignado'});
          }else{
            //console.log(id_negocio);
            res.json({status:'El negocio todavía no pasó la prefactibilidad'});
          }
        }catch{
          res.json({status:
            'No se pudo procesar la petición' + ' ' + req.body.id + ' ' + req.body.newLegajo
          });
        }
  }else{
    //Tira error si ya existe habilitación con nuevo número de legajo
    res.json({status:'Ya existe una habilitacion el número de legajo: '+req.body.newLegajo});
  }
}

const verHabilitaciones = async (req, res) => {
  const habilitaciones = await Habilitacion.find();
  res.json(habilitaciones);
};

const verHabilitacion = async (req, res) => {
  const { legajo } = req.params;
  const habilitacion = await Habilitacion.find({ NroLegajo : legajo});
  res.json(habilitacion);
};


module.exports = {
  verHabilitaciones,
  verHabilitacion,
  crearHabilitacion,
  setLegajo,
  setExpediente
};
