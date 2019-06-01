const routes = require("express").Router();
const { User } = require("./app/models");


// // Force creating user for test
// User.Create({
//     name: "Silvio",
//     email: "silvio@gmail.com",
//     password_hash: "123123"
// });

const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");
const HelloController = require('./app/controllers/HelloController');

routes.post("/sessions", SessionController.store);
routes.get("/hello", HelloController.hello);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})

module.exports = routes;
