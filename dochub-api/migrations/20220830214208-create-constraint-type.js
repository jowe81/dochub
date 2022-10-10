'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConstraintTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      userAssignable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      userCreatable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      allowDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      includeInSearchCriteria: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },  
      showInSearchResults: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ConstraintTypes');
  }
};