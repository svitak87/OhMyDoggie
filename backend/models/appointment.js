const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, 
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      services: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      petName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assignTo: {
        type: DataTypes.STRING,
        allowNull: true
      } 
    },
    {
      timestamps: false,
    }
  );

  return Appointment; 
};
