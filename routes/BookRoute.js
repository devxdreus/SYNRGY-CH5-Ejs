import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/BookController.js';

const router = express.Router();

router.get('/users', getAllBooks);
router.get('/users/:id', getBookById);
router.post('/users/', createBook);
router.put('/users/:id', updateBook);
router.delete('/users/:id', deleteBook);

export default router;
