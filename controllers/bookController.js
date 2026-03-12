const Book = require('../models/Book');

// a. Add new book
exports.addBook = async (req, res, next) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book); // 201 Created [cite: 23]
    } catch (error) {
        res.status(400); // 400 Bad Request [cite: 25]
        next(error);
    }
};

// b & e. Get all or Search
exports.getBooks = async (req, res, next) => {
    try {
        const { title } = req.query;
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        const books = await Book.find(query);
        res.status(200).json(books); // 200 Success [cite: 21]
    } catch (error) {
        res.status(500); // 500 Server Error [cite: 29]
        next(error);
    }
};

// Get book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Not Found" }); // 404 Not Found [cite: 27]
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// c. Update book details
exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: "Not Found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// d. Delete book record
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: "Not Found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        next(error);
    }
};