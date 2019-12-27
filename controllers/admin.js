const Admin = require('../models/admin');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');


module.exports.adminLogin = async function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email or password!'}]});
    }
    const candidate = await Admin.findOne({email: req.body.email})

    if (candidate) {
        const result = bcrypt.compareSync(req.body.password, candidate.password)
        if (result) {
            const token = jwt.sign({
                email: candidate.email,
                adminId: candidate._id,
                role: candidate.role
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Пароль неверный'})
        }
    } else {
        res.status(404).json({message: 'Админ не найден'})
    }
};
module.exports.adminRegister = async function (req, res) {
    if (!req.body.name ||!req.body.email  || !req.body.password) {
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email or password or name!'}]});
    }
    const candidate = await Admin.findOne({email: req.body.email});
    const collection = await Admin.find({})
    if (candidate || collection.length !== 0) {
        res.status(409).json({message: 'Admin must be only one'})
    } else {
        const salt = bcrypt.genSaltSync(10)
        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })

        try {
            await admin.save()
            res.status(201).json(admin)
        } catch(e) {
            errorHandler(res, e)
        }
    }
};
module.exports.allUser = async function (req, res) {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (e) {
        errorHandler(res, e)
    }

}
/*
Admin.find({}, function (err, existingAdmin) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if (existingAdmin) {
            return res.status(422).send({errors: [{title: 'Admin already is', detail: 'Admin can be only one!'}]});
        } else {
            const salt = bcrypt.genSaltSync(10);
            const admin  = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                role: 'admin'
            })
            admin.save(function (err) {
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.status(201).json({admin});
            })
        }
    })
    */