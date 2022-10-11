'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        obDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Candidates',
          key: 'id'
        }
      },
      job_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Jobs',
          key: 'id'
        }
      },
      gender: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING(8),
        defaultValue: "general"
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};