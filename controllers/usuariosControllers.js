const Usurios = require("../models/Usurios")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

exports.registrarUsuario = async (req, res) => {

    //Leer los datos del usuario y guardar
    const usuario = new Usurios(req.body)
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save()
        res.json({ mensaje:'Usuario Creado Correctamente'})
    } catch (error) {
        console.log(error)
        res.json({ mensaje: 'Hubo un error' })
        
    }
   
}
exports.autenticarUsuario = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //Buscar el usuario
        const usuario = await Usurios.findOne({ email });
    
        if (!usuario) {
          return res.status(401).json({ mensaje: 'Ese usuario no existe' });
        }
    
        //Me fijo que la contraseña sea correcta
        if (!bcrypt.compareSync(password, usuario.password)) {
          return res.status(401).json({ mensaje: 'Password incorrecto' });
        }
    
        //Si pasa las validaciones, creo el JWT 
        const token = jwt.sign(
          {
            email: usuario.email,
            nombre: usuario.nombre,
            id: usuario._id
          },
          'LLAVESECRETA',
          { expiresIn: '1h' }
        );
        
        res.json({ token });
      } catch (error) {
        next(error);
      }


}