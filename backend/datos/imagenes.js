const fs = require("fs");
const path = require("path");

function guardarImagen(imagen, id) {
    const dirPath = path.join(__dirname, `../usuarios/${id}`);

    fs.mkdir(dirPath, { recursive: true });
    const newPath = path.join(dirPath, id);
    fs.renameSync(imagen.path, newPath);

    return newPath;
}

module.exports = guardarImagen