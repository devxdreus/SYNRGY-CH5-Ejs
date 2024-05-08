import express from 'express';
import multer from 'multer'; // Import multer
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/BookController.js';

const router = express.Router();

const storage = multer.memoryStorage(); // Menyimpan file gambar ke dalam buffer memory
const upload = multer({ storage: storage });

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', upload.single('image'), createBook);
router.put('/books/:id', upload.single('image'), updateBook);
router.delete('/books/:id', deleteBook);

export default router;
