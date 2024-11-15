const express = require("express");
const router = express.Router();
const validarNegocio = require("../validaciones/validarNegocio");
const { catchAsync } = require("../utils");
const {crearNegocio, obteberPlano} = require("../controllers/negocio")

//configuracion para multer (guardar archivos)
const multer = require('multer')
const subirArchivo = multer({dest: 'archivos/'}) 

//Ruta para crear el negocio
// Middleware para subir múltiples archivos (máximo 2) con el campo 'archivos'
// Middleware para validar los datos del negocio en el cuerpo de la solicitud
/*Middleware para manejar errores, si no hay ningun error
se carga el negocio con todos los */
router.post("/crearNegocio", 
    subirArchivo.array('archivos', 2),
    validarNegocio
    ,catchAsync(crearNegocio))


router.get("/plano/:id", catchAsync(obteberPlano))

module.exports = router