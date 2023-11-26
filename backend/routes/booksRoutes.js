import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear


        ) {
            return res.status(400).send({
                message: 'Send all required fields title, author, publisher'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,

        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// routes to get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(201).json({
            count: books.length,
            data: books 
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// routes to get one book from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(201).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// route to update a book by id
router.put('/:id',async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear


        ) {
            return res.status(400).send({
                message: 'Send all required fields title, author, publisher'
            });
        }

        const { id } = req.params;

        const result =  await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(201).send({message: 'Book Updated Successfully!'})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }

});


// route to detete a book by id
router.delete('/:id',  async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({message: "Book not found"});
        }

        return res.status(201).send({message: 'Book Deleted Successfully'});

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});



export default router;
