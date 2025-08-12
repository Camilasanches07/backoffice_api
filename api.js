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

const User = require("./models/user.model");

const app = express() //Função "listen" usada para rodar o servidor. Espera 2 parâmetros, um a porta e outro uma função de callback para ser executada quando o servidor inicializar


app.use(express.json())

app.get('/api/users', async (req,res) => { //res envia uma mensgame de volta "resposta"
    const data = await User.find({})
    res.send(data)
})

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id; //pega o valor do parâmetro(url). ":" - significa que um parâmetro será passado
    const data = await User.findOne({_id:id})
    if (!data) {
        return res.status(400).send("Usuário não encontrado!") //'send' é utilizado para enviar a resposta da requisição
    }
    res.send(data)
})

app.post('/api/users', async (req, res) => {
    const data = req.body
    data.password = bcrypt.hashSync(data.password, 10)
    const userCreated = await User.create(data)//create criar um registro dentro do banco na coleção de "User"
    res.send({data:userCreated})
})

app.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = await User.findByIdAndUpdate(id, req.body, {new:true})
    if (!data) {
        return res.status(400).send("Usuário não encontrado!")        
    }
    res.send(data) //Responde o usuário com o index que pedimos
})

app.delete('/api/users/:id', async(req, res) => {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id)
    if (!data) {
        return res.status(404).send('Usuário não encontrado!')
    }
    res.send('Usuário deletado com sucesso!')
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
}) 
