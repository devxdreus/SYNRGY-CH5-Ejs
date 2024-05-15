import Book from '../models/BookModel.js';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const saveImage = (imageFile) => {
    if (!imageFile) {
        throw new Error('No image file provided');
    }

    const fileName = `${Date.now()}_${imageFile.originalname}`;
    const imagePath = path.join('public', 'uploads', fileName);

    try {
        fs.writeFileSync(imagePath, imageFile.buffer);
        return fileName;
    } catch (error) {
        console.error('Error saving image file:', error);
        throw new Error('Failed to save image file');
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.render('index', { books: books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Failed to fetch books' });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            res.status(404).json({ message: 'Buku tidak ditemukan' });
            return;
        }
        const bookWithImageUrl = {
            ...book.toJSON(),
            image: `http://localhost:5000/uploads/${book.image}`, // URL gambar
        };
        res.json(bookWithImageUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const showCreateForm = async (req, res) => {
    res.render('create'); // Render tampilan create.ejs
};

export const createBook = async (req, res) => {
    const { name, author, price } = req.body;
    const image = req.file;

    try {
        const fileName = saveImage(image);

        const newBook = await Book.create({
            name,
            author,
            price,
            image: fileName,
        });
        res.redirect('/books');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const showEditForm = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.render('edit', { book }); // Render tampilan edit.ejs dan kirim data buku yang akan diedit
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { name, author, price } = req.body;
    const image = req.file;

    try {
        const book = await Book.findByPk(id);
        if (!book) {
            res.status(404).json({ message: 'Buku tidak ditemukan' });
            return;
        }

        if (image) {
            const fileName = saveImage(image);
            await book.update({ name, author, price, image: fileName });
        } else {
            await book.update({ name, author, price });
        }

        res.redirect('/books');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            res.status(404).json({ message: 'Buku tidak ditemukan' });
            return;
        }
        await book.destroy();
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
