import { Sequelize } from 'sequelize';

import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Book = db.define(
  'books',
  {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Book;

(async () => {
  await db.sync();
})();
