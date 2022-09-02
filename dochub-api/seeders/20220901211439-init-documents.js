'use strict';

const documents = require('../modules/documents');

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
    await documents.create({
      title:"Configuring the SD9 console", 
      author: "Mark",
      constraints: [1, 2, 5, 7],
      userId: 2
    });
    await documents.create({
      title:"Ross Carbonite Quickstart Guide", 
      author: "Mark",
      constraints: [3, 5, 8],
      userId: 1
    });
    await documents.create({
      title:"Onyx Manual", 
      author: "Matthew",
      constraints: [5, 9, 10],
      userId: 1
    });
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
