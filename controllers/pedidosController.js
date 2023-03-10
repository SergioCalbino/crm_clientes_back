const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)

    try {
        await pedido.save();
        res.json({msj: 'Pedido creado correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}
exports.traerPedidos = async (req, res, next) => {
    
    try {
        //Populate permite traer la tabla que fue defnida a traves de la referncia en el modelo
        //En este caso anidamos los populate del modelo Clientes y Productos
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedidos)
    } catch (error) {
        console.log(error)
        next();
    }
};

exports.traerPedido = async (req, res, next) => {
    const { idPedido } = req.params

    try {
        const pedido = await Pedidos.findById({_id:idPedido }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })

        if (!pedido) {
            res.json({mjs: 'El pedido no existe'})
            return next()
        }

        res.json(pedido)
    } catch (error) {
        console.log(error)
        next();
    }
};

exports.actualizarPedido = async (req, res, next) => {
    const { idPedido } = req.params

    try {
        let pedido = await Pedidos.findByIdAndUpdate({_id:idPedido }, req.body, {
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })

        res.json(pedido)
    } catch (error) {
        console.log(error)
        next();
    }
}

exports.eliminarPedido = async (req, res, next) => {
    const { idPedido } = req.params

    try {
       await Pedidos.findOneAndDelete({_id:idPedido })

        res.json({msj: 'El pedido ha sido eliminado'})
    } catch (error) {
        console.log(error)
        next();
    }
}