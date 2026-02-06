const express = require('express');

const router = express.Router();
const Book = require('../models/Book');

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

//fetch all books
router.get('/', async(req,res) => {
    try{
        const books = await Book.find();
        res.json(books);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

//update book
router.put('/:id', async(req,res) => {
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedBook);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
})

//delete book
router.delete('/:id', async(req,res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.json({message: 'book deleted successfully'});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;










