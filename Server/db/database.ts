import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('desafiovirtex', 'root', 'supersecret', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;