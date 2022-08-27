'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
    {
      name: 'Audio',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Video',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Media',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Broadcast',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lighting',
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
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
