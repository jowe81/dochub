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
   await queryInterface.bulkInsert('Users', [
    {
      name: 'Johannes',
      email: 'johannes@drweber.de',  
      password: '$2b$10$Sb1wxGoov/7UhkBcK9fW/OL8RL/eGZ2/YHT9.UtZ6mtCOofAwKpIm',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Jess',
      email: 'jess@drweber.de',
      password: '$2b$10$Sb1wxGoov/7UhkBcK9fW/OL8RL/eGZ2/YHT9.UtZ6mtCOofAwKpIm',
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
