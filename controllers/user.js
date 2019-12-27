const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const error = require('../utils/errorHandler');
const User = require('../models/user');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const result = bcrypt.compareSync(req.body.password, candidate.password)
        if (result) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
                role: candidate.role
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Пароль неверный'})
        }
    } else {
        res.status(404).json({message: 'Пользователь не найден'})
    }

}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({message: 'Такой email уже занят'})
    } else {
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            error(res, e)
        }
    }
}