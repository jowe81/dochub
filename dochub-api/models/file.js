'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.belongsTo(models.Document, {
        foreignKey: 'documentId',
      });
    }
  }
  File.init({
    originalName: DataTypes.STRING,
    size: DataTypes.INTEGER,
    extension: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    path: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'File',
    timestamps: true,
  });
  return File;
};