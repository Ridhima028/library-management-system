require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookController = require('./controllers/bookController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Requirement: Enable express.json() middleware [cite: 16]

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("DB Connection Error:", err));

// API Endpoints as per Case Study [cite: 18]
app.post('/books', bookController.addBook); // Add new book
app.get('/books', bookController.getBooks); // Get all books
app.get('/books/search', bookController.getBooks); // Search books by title
app.get('/books/:id', bookController.getBookById); // Get book by ID
app.put('/books/:id', bookController.updateBook); // Update book details
app.delete('/books/:id', bookController.deleteBook); // Delete book record

// Global Error Handling Middleware [cite: 31]
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));