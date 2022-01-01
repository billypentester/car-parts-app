const express = require('express');
const router = express.Router()
const model = require('../models/schema')


router.get('/add', async(req, res) => {

    const cars = await model.find() 
    res.send(cars)
    console.log(cars)
 
})

// router.post('/add', async(req, res) => {

//     const books = await new book(req.body)
//     console.log(req.body)
//     books.save().then( () =>{
//         res.send(books)
//         console.log("book inserted.........")
//     })

// })



module.exports = router
