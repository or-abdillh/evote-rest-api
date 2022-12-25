'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        title: 'Pemilihan Ketua dan Wakil Ketua Umum HIMA TI Politeknik Hasnur Tahun Kepengurusan 2023',
        start: new Date(),
        end: new Date(),
        passcode: 'HIMATI2021',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
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
