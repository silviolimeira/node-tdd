const bcrypt = require('bcryptjs');
const { User } = require('../models')

class HelloController {
    async hello(req, res) {
        const user = await User.create({
            name: "silvio", email: "silvio@gmail.com", password_hash: "$2a$08$NuPp4HW5lEutP9eFgJCT.e4YqgSwwdqk0zuqTUAPspzwip7rj/lYO"
        });

        return res.json({
            user,
            token: user.generateToken()
        });
    }
}

module.exports = new HelloController();