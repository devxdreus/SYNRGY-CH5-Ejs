import express from 'express';
import BookRoute from './routes/BookRoute.js';
import path from 'path';
import multer from 'multer';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uploadDirectory = path.join(__dirname, '../public/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(upload.single('image'));

app.use(BookRoute);

app.listen(5000, () => console.log(`Server up and running on localhost:5000`));
