const negocio = require("../controllers/negocio")
const Habilitacion = require("../models/habilitacion");
const {getBusinessById} = require("../controllers/negocio");
const { getClientById } = require("./usuario");
const sendMail = require("./email");
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

const verHabilitaciones = async (req, res) => {
  const habilitaciones = await Habilitacion.find();
  res.json(habilitaciones);
};

const verHabilitacion = async (req, res) => {
  const { legajo } = req.params;
  const habilitacion = await Habilitacion.find({ NroLegajo : legajo});
  res.json(habilitacion);
};

const getAutorization = async (req, res) =>{
  try {
    
  } catch (error) {
    console.log(error.message);
  }
}

const verifyAuthorizationExpiration = async () =>{  
  try {
    const now = new Date();

    const authorizations = await Habilitacion.find();

    authorizations.forEach(authorization => {
      if (authorization.Vencimiento && new Date(authorization.Vencimiento) < now) {
        sendEmailAuthorizationExpired(authorization);
      }
    });
  } catch (error) {
    console.error('Error al verificar las habilitaciones:', error);
  }
};

const sendEmailAuthorizationExpired = async (authorization) =>{
  //TODO agregar el mail del sector de habilitaciones
  const emailEmployee = process.env.EMAIL_HABILITACIONES
  const {num_expediente: fileNumber, _id: idAutorization, Vencimiento: expiredDate, IdNegocio} = authorization
  const {ciudad: city, calle: street, altura: number, idUsuario: clientId} = await getBusinessById(IdNegocio)  
  const {nombre: name, apellido: lastName, email, telefono: phone, cuil: cuit} = await getClientById(clientId)
  const mailInfo = {
    to: emailEmployee,
    subject: 'Habilitación Vencida',
    template: 'expiredAuthorizationToEmployee',
    params: {
      fileNumber,
      idAutorization,
      expiredDate,
      city,
      street,
      number,
      name,
      lastName,
      phone,
      cuit
    }
  };
  await sendMail.sendMailJob(mailInfo);
}


module.exports = {
  verHabilitaciones,
  verHabilitacion,
  crearHabilitacion,
  verifyAuthorizationExpiration
};
