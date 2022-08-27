'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Locations', [
    {
      name: 'East Van',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'West Side',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Auditorium',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Control Room',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Gym',
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
    await queryInterface.bulkDelete('Locations', null, {});
  }
};
