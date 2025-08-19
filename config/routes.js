const userRouter = require('../routes/user.router');

module.exports = (app) => {
    app.use("/api/users", userRouter);
    app.get("/", function(req, res){
        res.set('content-type', 'text/html');
        res.send('Bem vindo a minha API.');
    })
};

