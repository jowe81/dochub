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
     await queryInterface.bulkInsert('Constraints', [
      {
        label: 'DiGiCo SD9',
        constraintTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: 'Allen&Heath SQ5',
        constraintTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: 'Ross Carbonite Ultra',
        constraintTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: 'East Van',
        constraintTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: 'Mount Pleasant',
        constraintTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: 'UBC',
        constraintTypeId: 2,
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
  }
};
