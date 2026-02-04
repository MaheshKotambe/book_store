const express = require('express');

const router = express.Router();
const book = require('../models/Book');

//CRUD api routes

//create new book
router.post('/', async(req,res) => {
    try{
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports = router;










