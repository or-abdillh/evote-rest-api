'use strict';

const md5 = require('md5')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = []

    // for ( let x = 0; x < 25; x++ ) {
    //   users.push({
    //     username: 'user-0' + x,
    //     password: md5('default123'),
    //     fullname: 'Fullname 0' + x,
    //     job: 'mahasiswa',
    //     gender: x % 2 === 0 ? 'male' : 'female',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })
    // }

    // for admin
    users.push({
      username: 'superadmin-hima',
      password: md5('himatipolihasnur'),
      fullname: 'Superadmin HIMA',
      job: 'pengurus',
      gender: 'male',
      role: 'master',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await queryInterface.bulkInsert('Users', users)
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
