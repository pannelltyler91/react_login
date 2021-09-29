'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  clients.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    client_email: DataTypes.STRING,
    client_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clients',
  });
  return clients;
};