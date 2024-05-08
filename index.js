import express from 'express';
import BookRoute from './routes/BookRoute.js';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });
const app = express();
app.use(express.json());
app.use(upload.single('image'));

app.use(BookRoute);

app.listen(5000, () => console.log(`Server up and running on localhost:5000`));
