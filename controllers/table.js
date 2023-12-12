const errorHender = require('../utils/errorHender')
const Table = require('../models/Table')
const getCurrentTime = require('./time')
const { ObjectId } = require('mongodb')

module.exports.withdraw = async function(req, res){
    try{
        const table = await Table.find()
        res.status(200).json(table)
    }catch(e){
        errorHender(res, e)
    }
}
console.log(getCurrentTime());

module.exports.newDevice = async function(req, res){
    try{
        const tables = await new Table({
            deviceName: req.body.deviceName,
            serialNumber: req.body.serialNumber,
            location: req.body.location,
            price: req.body.price,
            created: getCurrentTime(),
            user: req.user.id
        }).save()
        res.status(200).json(tables)
        }catch(e){
            errorHender(res, e)
        }
}

module.exports.changeDevice = async function(req, res){
    console.log(req.body);
    try{
        const table = await Table.findOneAndUpdate(
            {_id: req.body.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(table)
    }catch(e){
        errorHender(res, e)
    }
}

module.exports.deleteDevice = async function(req, res){
    try{
        
        const objectId = new ObjectId(req.params.id);
        console.log(objectId);
        console.log(req.params.id);
        await Table.deleteOne({ _id: objectId});
        
        res.status(200).json({
            message: 'Запис було видалено.'
        })
    }catch(e){
        errorHender(res, e)
    }
}

module.exports.history = async function(req, res){
    try{
        const table = await Table.find().sort({created: -1})
        res.status(200).json(table)
    }catch(e){
        errorHender(res, e)
    }
}