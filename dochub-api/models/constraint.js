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
    label: { type: DataTypes.STRING,  unique: 'compositeIndex' },
    constraintTypeId: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
  }, {
    sequelize,
    modelName: 'Constraint',
    timestamps: false,
    indexes: [{ unique: true, fields: ['label', 'constraintTypeId'] }],
  });
  return Constraint;
};