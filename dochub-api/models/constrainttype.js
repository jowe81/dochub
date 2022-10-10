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
      type: DataTypes.STRING,
      unique: true,
    },
    userAssignable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    userCreatable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    allowDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    showInSearchResults: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    includeInSearchCriteria: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
}, {
    sequelize,
    modelName: 'ConstraintType',
    timestamps: false,
  });
  return ConstraintType;
};