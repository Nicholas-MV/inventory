const pool = require('mongoose')
const Schema = pool.Schema

const inventory = new Schema({
    deviceName:{
        type: String,
        required: true
    },
    serialNumber:{
        type: String,
        required: true
    },
    location:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    created:{
        type: String,
        required: true
    },
    user:{
        ref: 'newusers',
        type: Schema.Types.ObjectId
    }
});

module.exports = pool.model('inventory', inventory)