const User = require("../models/user.model");

exports.getUsers=  async (req,res) => { 
    const data = await User.find({})
    res.send(data)
}

exports.getUser=async (req, res) => {
    const id = req.params.id; //pega o valor do parâmetro(url). ":" - significa que um parâmetro será passado
    const data = await User.findOne({_id:id})
    if (!data) {
        return res.status(400).send("Usuário não encontrado!") //'send' é utilizado para enviar a resposta da requisição
    }
    res.send(data)
}

exports.createUser =  async (req, res) => {
    const data = req.body
    //data.password = bcrypt.hashSync(data.password, 10)
    const userCreated = await User.create(data)//create criar um registro dentro do banco na coleção de "User"
    res.send({data:userCreated})
}

exports.updateUser =  async (req, res) => {
    const id = req.params.id;
    const data = await User.findByIdAndUpdate(id, req.body, {new:true})
    if (!data) {
        return res.status(400).send("Usuário não encontrado!")        
    }
    res.send(data) 
}

exports.deleteUser = async(req, res) => {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id)
    if (!data) {
        return res.status(404).send('Usuário não encontrado!')
    }
    res.send('Usuário deletado com sucesso!')
}
