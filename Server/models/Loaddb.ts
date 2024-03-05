import { Model, DataTypes } from 'sequelize';

import sequelize from '../db/database';

class Loaddb extends Model {
  declare loaded: boolean;
}

Loaddb.init({
  loaded: { 
    type: DataTypes.BOOLEAN 
  }}, 
  {
    tableName: 'loaddb', sequelize 
  }
);

export default Loaddb;