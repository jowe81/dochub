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
        userAssignable: false,
        allowDelete: false,
        showInSearchResults: false,
        userCreatable: true,
      },
      {
        name: 'Location',
        userAssignable: true,
        allowDelete: true,
        showInSearchResults: false,
        userCreatable: false,
      },
      {
        name: 'Category',
        userAssignable: true,
        allowDelete: true,
        showInSearchResults: false,
        userCreatable: false,
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
