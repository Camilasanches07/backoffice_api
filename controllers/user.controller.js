const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id });
    if (!data) {
      return res.status(404).send("Usuário não encontrado!");
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hashSync(data.password, 10);
    const userCreated = await User.create(data);
    res.send({ data: userCreated });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(404).send("Usuário não encontrado!");
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send("Usuário não encontrado!");
    }
    res.send("Usuário deletado com sucesso!");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Credenciais inválidas!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Credenciais inválidas!");
    }

   
};
