const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // Autorizacion por el Header
    const authHeader = req.get('Authorization'); //el req.get es lo que capturas desde el back lo que envia el front

    if (!authHeader) {
        const error = new Error('No autenticado, no hay jwt');
        error.statusCode = 401;
        throw error
        
    }

    //Obtener token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error
        
    }

    // Si es un token valido, pero hy algun error
    if (!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error
        
    }
    next()

}