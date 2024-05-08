import express from 'express';
import BookRoute from './routes/BookRoute.js';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(BookRoute);

app.listen(5000, () => console.log(`Server up and running on localhost:5000`));
