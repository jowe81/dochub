'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Document.belongsToMany(models.Constraint, {
        through: 'DocumentConstraints',
      });
      Document.hasMany(models.File, {
        foreignKey: 'documentId',
      });
    }
  }
  Document.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Document',
    timestamps: true,
  });
  return Document;
};