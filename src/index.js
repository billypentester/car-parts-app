var ObjectId = require('mongoose').Types.ObjectId; 
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('hbs')

const model = require('./models/schema')
const client = require('./models/customer')
const staticweb = path.join(__dirname, "/public");
const tempweb = path.join(__dirname, "/tmp/views/")

const port = 3000 || process.env.PORT;
const app = express()

app.use('/public',express.static(staticweb))
app.set('views', tempweb);
app.set("view engine", "hbs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.get('/', async(req, res) => {

    const cars = await model.find() 
    res.render("index",{
        car1 : cars[0]
    })
})

app.post('/bill', async(req, res) => {

    const customer = await new client(req.body)
    
    customer.save().then( () =>{
        res.render("added", {
            msg : "bill added to database."
        })
    })

})

app.get('/add', async(req, res) => {

    const search = req.query.id;
    const cars = await model.findById(`${search}`)
    res.render("part",{
        val : cars._id,
        part : cars.parts
    })

})

app.get('/admin', (req, res) => {

    res.render("additem")
})



app.post('/additem', async(req, res) => {

    const id = "61c2255ca6bf6556dafef8ac"
    
    const parts = await model.findByIdAndUpdate( {_id : `${id}`}, {$push: { parts:req.body }} , { new : true }) 
    res.render("additem",{ msg : req.body.name })
})

app.get('/updateitem', async(req, res) => {

    const id = "61c2255ca6bf6556dafef8ac"
    const search = req.query.search;
    const name = req.query.name;
    const pic = req.query.pic;
    const price = req.query.price;
    const parts = await model.update( {'parts.name': `${search}`} , {'$set': {'parts.$.name': name, 'parts.$.pic': pic, 'parts.$.price': price}} , { new : true }) 
    res.render("additem",{ msg3 : req.query.search })
    
})

app.get('/removeitem',async(req,res)=> {
    
    const search = req.query.name;
    const id = "61c2255ca6bf6556dafef8ac"

    const parts = await model.findByIdAndUpdate( {_id : `${id}`}, { $pull: {parts: {name : `${search}`} } } , { new : true } ) 

    res.render("additem",{ msg1 : search })
})

app.get('/checkout', async(req, res) => {

    const search = req.query.id;
    const cars = await model.findById(`${search}`)
    res.render("part",{
        val : cars._id,
        part : cars.parts
    })

})

app.get('/final', async(req, res) => {

    const search = "61c2255ca6bf6556dafef8ac";
    const part = req.query.part;
    const cars = await model.findById(`${search}`);
    const parts = cars.parts;
    var item;
    for (var i = 0; i < parts.length; i++)
    {
        if (parts[i].name == part){
           item = parts[i]
        }
    }
    res.render("final" ,{ name : item.name, price: item.price, pic : item.pic })
})

app.listen(port, () => {
    console.log(`Example app listening on : ${port}`)
})
