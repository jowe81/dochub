const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`sqlite:${process.env.DBFILE}`);

const Document = sequelize.define('Document', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Other model options go here
});

module.exports = Document;