import Book from '../models/BookModel.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const ensureUploadDirectoryExists = async () => {
  try {
    await fs.access(uploadDirectory);
  } catch (error) {
    await fs.mkdir(uploadDirectory, { recursive: true });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
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
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  const { name, author, price } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(400).json({ message: 'Gambar buku harus disertakan' });
  }
  const imageName = uuidv4() + path.extname(image.originalname);
  try {
    await image.mv(path.join(uploadDirectory, imageName));
    upload;
    const newBook = await BooksModel.create({
      name,
      author,
      price,
      image: imageName,
    });
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, author, price } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }
    await book.update({ name, author, price });
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
