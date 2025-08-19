const express = require('express') //Express oferece um "combo" de funcionalidades
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const db = require("./config/db") //importar conexão


db.on("connected", function () { //"on" efento de ficar ouvindo
    console.log("connected!");
});

db.on("disconnected", function () {
    console.log("disconnected!");
});

db.on("error", function (error) {
    console.log('Connection error: ' + error);
});

const app = express() //Função "listen" usada para rodar o servidor. Espera 2 parâmetros, um a porta e outro uma função de callback para ser executada quando o servidor inicializar

app.use(express.json())

const routes = require('./config/routes')
routes(app)

app.listen(3000, () => {
    console.log("Server running on port 3000")
}) 

