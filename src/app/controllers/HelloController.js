const { User } = require('../models')

const faker = require('faker');
const { factory } = require('factory-girl');

class HelloController {
    async hello(req, res) {
        const user = await User.create({ name: "silvio", email: "silvio@gmail.com", password_hash: "123123" });

        return res.json({
            user,
            token: user.generateToken()
        });
    }
}

module.exports = new HelloController();