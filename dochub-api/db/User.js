const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`sqlite:${process.env.DBFILE}`);

const User = sequelize.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = User;