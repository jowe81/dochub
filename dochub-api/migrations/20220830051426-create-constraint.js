'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Constraints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // label: {
      //   type: Sequelize.STRING
      // },
      // constraintTypeId: {
      //   type: Sequelize.INTEGER,
      // },
      label: { type: Sequelize.STRING,  unique: 'comp' },
      constraintTypeId: { type: Sequelize.INTEGER, unique: 'comp' },
  
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Constraints');
  }
};