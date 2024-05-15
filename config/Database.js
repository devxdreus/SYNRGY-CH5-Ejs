import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('synrgy-crud', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

export { sequelize };
