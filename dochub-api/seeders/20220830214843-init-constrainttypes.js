'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('ConstraintTypes', [
      {
        name: 'Keyword',
        userEditable: false,
      },
      {
        name: 'Location',
        userEditable: true,
      },
      {
        name: 'Category',
        userEditable: true,
      },
      {
        name: 'Site',
        userEditable: true,
      },
      ], {});  
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ConstraintTypes', null, {});
  }
};
