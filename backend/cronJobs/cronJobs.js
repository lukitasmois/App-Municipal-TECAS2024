const axios = require("axios");
const nextToExpire = async () => {
    try{
        const habilitaciones = await axios.get(`${process.env.CLIENT_URL}/api/habilitaciones/expireBussines`);
        console.log(habilitaciones);
        for(let habilitacion of habilitaciones.data){
            let bussines = await axios.get(`${process.env.CLIENT_URL}/api/negocios/${habilitacion.IdNegocio}`)
            let user = await axios.get(`${process.env.CLIENT_URL}/api/usuarios/${bussines.data.idUsuario}`) 
           await axios.post(`${process.env.CLIENT_URL}/api/emails`,{ to: user.data.email, subject: " Email de expiración", template: "emailNextExpire", params: {
                name: user.data.nombre,
                days: 20,
            }});
        }
        console.log("Se verificaron los vencimientos correctamente.");
    }catch (err) {
        console.error("No se pudieron leer las habilitaciones:", err.message);
    }
}

module.exports = {nextToExpire};