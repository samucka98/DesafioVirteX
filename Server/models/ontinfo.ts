import { Model, DataTypes } from 'sequelize';

import sequelize from '../db/database';

class Ontinfo extends Model {
  declare id: number;
  declare slot: number;
  declare port: number;
  declare ont_id: number;
  declare sn: string;
  declare state: string;
  declare ont_origin: string;
}

Ontinfo.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  slot: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ont_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sn: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  ont_origin: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
}, {
  tableName: 'ontinfo',
  sequelize
});

export default Ontinfo;