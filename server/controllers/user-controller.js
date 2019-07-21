const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {

    static register(req, res, next) {
        User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body)
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let token = jwt.signToken(payload)
                        res.status(200).json(token)
                    } else {
                        throw new Error('Wrong email/ password.')
                    }
                } else {
                    throw new Error('Wrong email/ password.')
                }
            })
            .catch(next)
    }

}

module.exports = UserController