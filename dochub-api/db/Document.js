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
  },
}, {
  // Other model options go here
});

module.exports = Document;