import { Sequelize } from 'sequelize';
import { sequelize } from '../config/Database.js';

const { DataTypes } = Sequelize;

const Book = sequelize.define(
    'books',
    {
        name: DataTypes.STRING,
        author: DataTypes.STRING,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING, // Menambahkan kolom image
    },
    {
        freezeTableName: true,
    }
);

export default Book;
