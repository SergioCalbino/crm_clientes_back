const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController');
const  usuarioController  = require('../controllers/usuariosControllers');

//Middleware par proteger rutas

const auth = require('../middleware/auth')

module.exports = function () {
    //Clientes
    // Agrega nuevos clientes vis POST
    router.post('/clientes', auth, clienteController.nuevoCliente)

    //Todos los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes)

    //Muestra un cliente en especifico

    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente)

    //Actualizar cliente

    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente)

    //Eliminar cliente

    router.delete('/clientes/:idCliente', auth, clienteController.eliminarCliente);

    //PRODUCTOS
    //nuevos prodcutos

    router.post('/productos', auth, productosController.subirArchivo, productosController.nuevoProducto);

    //Traer productos

    router.get('/productos', auth, productosController.mostrarProductos )

    //Mostrar porducto por id
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto )

    //Actualizar producto
    router.put('/productos/:idProducto', auth, productosController.subirArchivo, productosController.actualizarProducto )

    //Eliminar un producto
    router.delete('/productos/:idProducto',auth, productosController.eliminarProducto )

    //Busqueda de productos
    router.post('/productos/busqueda/:query', productosController.buscarProducto)

    //***PEDIDOS* */
    //Crear pedido
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

    //Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.traerPedidos);

    //Mostar un pedido por ID
    router.get('/pedidos/:idPedido', auth, pedidosController.traerPedido);

    //Actualizar un pedido
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido', auth,  pedidosController.eliminarPedido);

    //Usuarios
    router.post('/crear-cuenta', usuarioController.registrarUsuario)

    router.post('/iniciar-sesion', usuarioController.autenticarUsuario )

    return router
    
}