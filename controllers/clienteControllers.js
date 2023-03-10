const Clientes = require("../models/Clientes");

// Agrega un nuevo cliente

exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body)

    try {
        await cliente.save();
        res.json({ mesaje: 'Se agrego un nuevo cliente' })
    } catch (error) {
        res.send(error);
        next()
    }
};

//MOSTRAR TODO LOS CLIENTES

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({})
        res.json({ clientes })
    } catch (error) {
        console.log(error)
        next()
        
    }
};

//muestra cliente por Id
exports.mostrarCliente = async (req, res, next) => {
    const{ idCliente } = req.params
    const cliente = await Clientes.findById(idCliente)
    // console.log(cliente);
    
    
    if (!cliente) {
        res.json({ mensaje: "Ese cliente no existe" })
        next()
    }
    res.json(cliente)
};

//

exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, req.body, {
            new: true //esto hace que traiga el valor actualizado
        });
        res.json(cliente)
    } catch (error) {
        res.send(error)
        next()

        
    }
};

//Eliminar cliente por ID

exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findByIdAndDelete({_id: req.params.idCliente})
        res.json({ mensaje: 'Cliente eliminado' })
    } catch (error) {
        console.log(error)
        next()
        
    }
}