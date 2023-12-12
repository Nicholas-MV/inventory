const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHender = require('../utils/errorHender')


module.exports.login = async function(req, res){
    const candidate = await User.model.findOne({email: req.body.email})

    if(candidate){
        const passResult = bcrypt.compareSync(req.body.pass, candidate.pass)
        if(passResult){
            // Генерація токену, паролі співпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: 'Пароль не вірний!'
            })
        }
    }else{
        res.status(404).json({
            message: "Користувач не найден!"
        })
    }
}

module.exports.register = async function(req, res){
    const candidate = await User.model.findOne({email: req.body.email})
    if (candidate){
        res.status(409).json({
            message: "Такий користувачь вже є!"
        })
    }else{
        const salt = bcrypt.genSaltSync(10)
        const pass = req.body.pass
        const user = new User.model({
            name: req.body.name,
            email: req.body.email,
            pass: bcrypt.hashSync(pass, salt)
        })

        try{
            await user.save()
            res.status(201).json(user)
        } catch(e){
            // Опрацювати помилку
            errorHender(res, e)
        }
        
    }
}