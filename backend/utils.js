const Formulario = require("./models/formulario.js");
const fs = require("fs");

async function generarFormularios() {
  //leer los formularios de la carpeta json-formularios y crearlos en la base de datos usando el modelo Formulario
  //verificar antes si ya estan creados, en ese caso no crearlos
  //verificar uno por uno, porque puede ser que se vayan agregando nuevos formularios

  const formulariosCargados = await Formulario.find();

  fs.readdirSync("./formularios-JSON").forEach((file) => {
    const formulario = JSON.parse(
      fs.readFileSync(`./formularios-JSON/${file}`, "utf-8")
    );

    //verificar si el formulario ya existe
    const formularioExistente = formulariosCargados.find((form) => {
      return form.nombreFormulario === formulario.nombreFormulario;
    });

    if (!formularioExistente) {
      console.log(formulario.nombreFormulario, "FORMULARIO CREADO");
      const nuevoFormulario = new Formulario(formulario);
      nuevoFormulario.save();
    }
  });
}

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

module.exports = { catchAsync, generarFormularios };
