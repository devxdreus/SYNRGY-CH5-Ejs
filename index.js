import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url'; // Import fileURLToPath dari modul 'url'
import { dirname } from 'path'; // Import dirname dari modul 'path'
import { sequelize } from './config/Database.js'; // Jika menggunakan Sequelize
import BookRoutes from './routes/BookRoute.js'; // Menggunakan BookRoutes dengan huruf besar di awal

const __filename = fileURLToPath(import.meta.url); // Dapatkan path ke file saat ini
const __dirname = dirname(__filename); // Dapatkan direktori dari path file saat ini

const app = express();

// Set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Use routes
app.use('/', BookRoutes); // Menggunakan BookRoutes dengan huruf besar di awal

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// Sync database (if using Sequelize)
sequelize
    .sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
