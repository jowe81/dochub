const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`sqlite:${process.env.DBFILE}`);

const Category = sequelize.define('category', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

const Document = require('./Document');
//Category.hasMany(Document);
//Document.belongsTo(Category);
Category.belongsToMany(Document, { through: 'DocumentsCategories' });
Document.belongsToMany(Category, { through: 'DocumentsCategories' });

module.exports = Category;