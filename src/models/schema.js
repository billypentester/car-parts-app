const mongoose = require('mongoose')
const conn = require('./../db/conn')


const carschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    model : String,
    parts: [
        { 
            name : String,
            pic : String,
            price : String
        }
    ],
    pic : String
})

const model = new mongoose.model('model',carschema);

module.exports = model