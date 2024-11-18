const express = require("express");
const router = express.Router();
const validarNegocio = require("../validaciones/validarNegocio");
const { catchAsync } = require("../utils");
const {authMiddleware, authIsHabilited} = require("../middlewares/auth_middleware");
const {
  crearNegocio,
  verNegocio,
  verNegocios,
  negociosPorUsuario
} = require("../controllers/negocio");

//configuracion para multer (guardar archivos)
const multer = require("multer");
const subirArchivo = multer({ dest: "archivos/" });

//Ruta para crear el negocio
// Middleware para subir múltiples archivos (máximo 2) con el campo 'archivos'
// Middleware para validar los datos del negocio en el cuerpo de la solicitud
/*Middleware para manejar errores, si no hay ningun error
se carga el negocio con todos los */
router.get("/nuevaHabilitacion/:id", catchAsync(negociosPorUsuario));
//Ruta para obtener un negocio mediante el id de usuario solo si este esta logeado y habilitado.
router.post(
  "/crearNegocio",
  subirArchivo.array("archivos", 2),
  validarNegocio,
  catchAsync(crearNegocio)
);

router.get("/", verNegocios);

router.get("/:id", verNegocio);

module.exports = router;
