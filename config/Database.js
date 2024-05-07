import { Sequelize } from 'sequelize';

const db = new Sequelize('synrgy-crud', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
