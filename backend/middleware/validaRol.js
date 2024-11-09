
//middleware Obtiene del body de la consulta el roll del usuario,si coincide, siguen la consulta,caso contrario tirar error 401 no autorizado

function Habilitacion(req, res, next) {
    const { rol } = req.body;
    console.log(rol);
    if (rol === 'HABILITACION') {
       next()
    } else {
    next(res.status(401).json({ error: 'Autorizacion solo para habiltaciones' }))
 }
 }
 function Catastro(req, res, next) {
    const { rol } = req.body;
    if (rol === 'CATASTRO') {
       next()
    } else {
       next(res.status(401).json({ error: 'Autorizacion solo para catastro' }))
 }
 }
 function Planeamiento(req, res, next) {
    const { rol } = req.body;
    if (rol === 'PLANEAMINTO') {
       next()
    } else {
       next(res.status(401).json({ error: 'Autorizacion solo para Planemimiento' }))
    }  
 }
 function Bomberos(req, res, next) {
    const { rol } = req.body;
    if (rol === 'PLANEAMINTO') {
       next()
    } else {
       next(res.status(401).json({ error: 'Autorizacion solo para Bomberos' }))
    }  
 }
 function ObrasPrivadas(req, res, next) {
    const { rol } = req.body;
    if (rol === 'OBRAS_PRIVADAS') {
       next()
    } else {
       next(res.status(401).json({ error: 'Autorizacion solo para Obras Privadas' }))
    }  
 }
 
 function IngresosPublicos(req, res, next) {
    const { rol } = req.body;
    if (rol === 'Ingresos Publicos' ) {
       next()
    } else {
       next(res.status(401).json({ error: 'Autorizacion solo para Obras Privadas' }))
    }  
 }
 
 function Admin(req, res, next) {
    const { rol } = req.body;
    if (rol === 'ADMIN') {
       next()
    } else {
       next(res.status(401).json({ error: 'Autorizacion solo para admin' }))
    }  
 }
 module.exports = {Habilitacion, Catastro, Planeamiento, Bomberos, ObrasPrivadas, IngresosPublicos, Admin};