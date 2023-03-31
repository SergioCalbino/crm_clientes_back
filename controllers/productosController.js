const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),

  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single("imagen");

//Sube un archivo

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

// Agrega uevo productos

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Producto creado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//Traer productos

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Muestra producto por Id
exports.mostrarProducto = async (req, res, next) => {
  const { idProducto } = req.params;

  try {
    const producto = await Productos.findById({ _id: idProducto });

    if (!producto) {
      res.json({ msj: "No existe el producto" });
      return next();
    }

    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarProducto = async (req, res, next) => {
  const { idProducto } = req.params;

  try {
    let nuevoProducto = req.body;

    //Verificar si hay imagen. Esto lo hacemos por si queremos actualziar la imagen
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById({ _id: idProducto });
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    //Esta consulta y actualziacion se hace si el usuario actauliza pero bi canbua la imgane
    let producto = await Productos.findByIdAndUpdate(
      { _id: idProducto },
      nuevoProducto,
      {
        new: true,
      }
    );

    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarProducto = async (req, res, next) => {
    const { idProducto } = req.params;
  
    try {
      await Productos.findByIdAndDelete({ _id: idProducto });
  
      
  
      res.json({msj: 'El producto se ha eliminado'});
    } catch (error) {
      console.log(error);
      next();
    }
  };

  exports.buscarProducto = async (req, res, next) => {

    try {
        const { query } = req.params
        console.log(req.params)
      const producto = await Productos.find({ nombre: new RegExp(query, 'i')})
      res.json(producto)
      
    } catch (error) {
      console.log(error)
      next()
      
    }
  }