import express from 'express';
import multer from 'multer'; // Import multer
import {
    getAllBooks,
    showCreateForm,
    createBook,
    showEditForm,
    updateBook,
    deleteBook,
} from '../controllers/BookController.js';

const router = express.Router();

const storage = multer.memoryStorage(); // Menyimpan file gambar ke dalam buffer memory
const upload = multer({ storage: storage });

router.get('/books', getAllBooks);
router.get('/books/new', showCreateForm);
router.post('/books', upload.single('image'), createBook);
router.get('/books/:id/edit', showEditForm);
router.put('/books/:id', upload.single('image'), updateBook);
router.delete('/books/:id', deleteBook);

export default router;
