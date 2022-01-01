const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/car"

mongoose.connect(db, { 
    useUnifiedTopology: true
})
.then ( ()=> console.log("Connection successful.......") )
.catch ( (err)=> console.log("Error........") )

var conn = mongoose.connection;

module.exports = conn;