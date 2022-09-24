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
      },
      {
        label: 'Allen&Heath SQ5',
        constraintTypeId: 1,
      },
      {
        label: 'Ross Carbonite Ultra',
        constraintTypeId: 1,
      },
      {
        label: 'Allen&Heath QU24',
        constraintTypeId: 1,
      },
      {
        label: 'Ross NK Series Router',
        constraintTypeId: 1,
      },
      {
        label: 'Panasonic RP160',
        constraintTypeId: 1,
      },
      {
        label: 'Panasonic UE150',
        constraintTypeId: 1,
      },
      {
        label: 'Panasonic AJ-PX380',
        constraintTypeId: 1,
      },
      {
        label: 'East Van',
        constraintTypeId: 2,
      },
      {
        label: 'Mount Pleasant',
        constraintTypeId: 2,
      },
      {
        label: 'UBC',
        constraintTypeId: 2,
      },
      {
        label: 'audio',
        constraintTypeId: 3,
      },
      {
        label: 'video',
        constraintTypeId: 3,
      },
      {
        label: 'lighting',
        constraintTypeId: 3,
      },
      {
        label: 'software',
        constraintTypeId: 3,
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
