'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Constraint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Constraint.belongsTo(models.ConstraintType, {
        foreignKey: 'constraintTypeId',
      })
      Constraint.belongsToMany(models.Document, {
        through: 'DocumentConstraints',
      })
    }
  }
  Constraint.init({
    label: DataTypes.STRING,
    constraintTypeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Constraint',
  });
  return Constraint;
};