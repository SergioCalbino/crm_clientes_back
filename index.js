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

const whiteList = [process.env.FRONTEND_URL]
console.log(process.env.FRONTEND_URL)
const corsOption = {
    origin: (origin, callback) => {
        //Revisar si la peticion viene de un servidor que esta en la lista blanca
        const existe = whiteList.some( dominio => dominio === origin )
        if (existe) {
            callback(null, true)
            
        } else {
            callback(new Error('No Permitido por Cors'))
        }
    }
}

//habilitar cors

app.use(cors(corsOption))
//Rutas de la app
app.use('/', routes())

//Carpeta publica
app.use(express.static('uploads'))
//puerto
app.listen(5000)