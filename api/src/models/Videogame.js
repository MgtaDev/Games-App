const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Videogame = sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    release: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ratings: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    
  }, {
    timestamps: false
  });

  return Videogame;
};