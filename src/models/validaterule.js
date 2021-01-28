/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class validaterule extends Model {
    static associate(models) {
    }
  }
  validaterule.init({
    rule: DataTypes.JSONB,
    data: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'validaterule',
  });
  return validaterule;
};
