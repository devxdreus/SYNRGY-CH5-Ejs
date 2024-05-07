import express from 'express';
import BookRoute from './routes/BookRoute.js';

const app = express();
app.use(express.json());
app.use(BookRoute);

app.listen(5000, () => console.log(`Server up and running on localhost:5000`));
