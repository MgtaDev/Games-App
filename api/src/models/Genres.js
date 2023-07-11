const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Genres = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
   
  },{timestamps: false}) 
  return Genres
}