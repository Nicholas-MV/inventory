const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    pass:{
        type: String,
        required: true
    }
});

module.exports.model = mongoose.model('newUsers', usersSchema)