'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Keywords', [
    {
      name: 'sq5',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'sd9',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'carbonite',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'dante',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'propresenter',
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
    await queryInterface.bulkDelete('Keywords', null, {});
  }
};
