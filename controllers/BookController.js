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
    const booksWithImageUrl = books.map((book) => {
      return {
        ...book.toJSON(),
        image: `http://localhost:5000/uploads/${book.image}`, // URL gambar
      };
    });
    res.json(booksWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export const createBook = async (req, res) => {
  const { name, author, price } = req.body;
  const image = req.file;

  try {
    const fileName = saveImage(image);

    const newBook = await Book.create({ name, author, price, image: fileName });
    res.status(201).json(newBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, author, price } = req.body;
  const { image } = req.file;

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

    res.json({ message: 'Buku berhasil diupdate' });
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
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
