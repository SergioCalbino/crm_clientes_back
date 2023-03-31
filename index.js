const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


//Cors permite que un cliente se conecte a un servidor

const cors = require('cors')

dotenv.config()
//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

//Crear el servidor

const app = express();
//Habilitar bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

//Defini un dominio(s) para recibir las peticiones

const dominiosPertmitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if (dominiosPertmitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))
//Rutas de la app
app.use('/', routes())

//Carpeta publica
app.use(express.static('uploads'))
//puerto
app.listen(5000)