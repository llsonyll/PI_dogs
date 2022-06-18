const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    minHeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    maxWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    minWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lifeTrail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
