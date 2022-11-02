'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Candidate.init({
    chairman_name: DataTypes.STRING,
    chairman_image: DataTypes.STRING,
    vice_chairman_name: DataTypes.STRING,
    vice_chairman_image: DataTypes.STRING,
    candidate_number: DataTypes.NUMBER,
    vision: DataTypes.STRING,
    mission: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Candidate',
  });
  return Candidate;
};