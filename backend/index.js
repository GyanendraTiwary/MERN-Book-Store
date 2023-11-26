import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();


// Middleware for handling cors policy
//method 1
app.use(cors());
//method 2
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));


// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to my First MERN Webpage");
});

app.use('/books', booksRouter);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });