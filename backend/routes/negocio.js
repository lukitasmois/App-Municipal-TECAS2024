const express = require("express");
const router = express.Router();
const validarNegocio = require("../validaciones/validarNegocio");
const { catchAsync } = require("../utils");
const {crearNegocio, obteberPlano, getNegocios} = require("../controllers/negocio")

//configuracion para multer (guardar archivos)
const multer = require('multer')
const uploadFile = multer({ storage: multer.memoryStorage() })

//Ruta para crear el negocio
// Middleware para subir múltiples archivos (máximo 2) con el campo 'archivos'
// Middleware para validar los datos del negocio en el cuerpo de la solicitud
/*Middleware para manejar errores, si no hay ningun error
se carga el negocio con todos los */
router.post("/crearNegocio", 
    uploadFile.array('archivos', 2),
    validarNegocio
    ,catchAsync(crearNegocio))


router.get("/plano/:idUsuario/:idPlano", catchAsync(obteberPlano));

router.get("/", catchAsync(getNegocios))

module.exports = router