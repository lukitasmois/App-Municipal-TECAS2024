const express = require("express");
const router = express.Router();
const validarNegocio = require("../validaciones/validarNegocio");
const { catchAsync } = require("../utils");

//configuracion para multer (guardar archivos)
const multer = require("multer");
const { validarNoContribuyente } = require("../middleware/validarRolEmpleado");

const uploadFile = multer({ storage: multer.memoryStorage() });
const {
  authMiddleware,
  authIsHabilited,
} = require("../middleware/auth_middleware");
const {
  crearNegocio,
  verNegocio,
  verNegocios,
  negociosPorUsuario,
  obtenerPlano,
  getNegocios,
  changeStateBusiness,
  getNextExpire
} = require("../controllers/negocio");

//configuracion para multer (guardar archivos)
const subirArchivo = multer({ dest: "archivos/" });

//Ruta para crear el negocio
// Middleware para subir múltiples archivos (máximo 2) con el campo 'archivos'
// Middleware para validar los datos del negocio en el cuerpo de la solicitud
/*Middleware para manejar errores, si no hay ningun error
se carga el negocio con todos los */

router.get("/nuevaHabilitacion/:id", negociosPorUsuario);
//Ruta para obtener un negocio mediante el id de usuario solo si este esta logeado y habilitado.
router.post(
  "/crearNegocio",
  uploadFile.array("archivos", 2),
  validarNegocio,
  catchAsync(crearNegocio)
);

router.get(
  "/plano/:idUsuario/:idPlano",
  authMiddleware,
  validarNoContribuyente,
  catchAsync(obtenerPlano)
);

router.get("/", verNegocios);

router.put(
  "/editarEstado/:id",
  authMiddleware,
  validarNoContribuyente,
  catchAsync(changeStateBusiness)
);

router.get("/:id", verNegocio);


module.exports = router;
