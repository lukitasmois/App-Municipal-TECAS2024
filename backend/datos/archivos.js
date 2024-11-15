const fs = require('node:fs')
const path = require('path');


function guardarArchivo(archivo, id, nuevoNombre) {
  
    // Crear la ruta de la nueva carpeta usando el id
    // aca se crea la ruta donde se va a crear la
    // carpeta con el id del usuario
    const dirPath = path.join('./archivos', id);
  
    // aca se crea la carpeta
    fs.mkdirSync(dirPath, { recursive: true });
  
    // aca se crea la nueva ruta del archivo dentro de la carpeta
    const newPath = path.join(dirPath, nuevoNombre);
  
    // aca se guarda el archivo en la ruta nueva
    fs.renameSync(archivo.path, newPath);
  
    return newPath;
  }

module.exports = guardarArchivo