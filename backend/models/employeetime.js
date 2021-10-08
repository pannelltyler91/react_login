'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  employeeTime.init({
    clockInHour: DataTypes.INTEGER,
    clockInMinutes: DataTypes.INTEGER,
    clockOutHour: DataTypes.INTEGER,
    clockOutMinutes: DataTypes.INTEGER,
    employee_id: DataTypes.STRING,
    date: DataTypes.STRING,
    timeStamp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employeeTime',
  });
  return employeeTime;
};