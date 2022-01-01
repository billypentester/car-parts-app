const mongoose = require('mongoose')
const conn = require('./../db/conn')


const clientschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    quantity : Number,
    price : Number ,
    total : Number
})

const client = new mongoose.model('client',clientschema);

module.exports = client