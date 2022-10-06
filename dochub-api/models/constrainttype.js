'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConstraintType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConstraintType.hasMany(models.Constraint, {
        foreignKey: 'constraintTypeId',
      });
    }
  }
  ConstraintType.init({
    name: {
      type: DataTypes.STRING
    },
    userEditable: {
      type: DataTypes.BOOLEAN,
    }
}, {
    sequelize,
    modelName: 'ConstraintType',
    timestamps: false,
  });
  return ConstraintType;
};