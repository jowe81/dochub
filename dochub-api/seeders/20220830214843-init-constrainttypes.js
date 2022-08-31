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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Location',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Site',
        createdAt: new Date(),
        updatedAt: new Date(),
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
