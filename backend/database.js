require("dotenv").config();
const { Sequelize } = require("sequelize");
const defineAppointment = require("./models/appointment"); 
const defineAdmin = require("./models/adminModel")

const isProduction = process.env.NODE_ENV === 'production';
console.log("Database URL:", process.env.DATA_BASE_PUBLIC);

const sequelize = new Sequelize(process.env.DATA_BASE_PUBLIC, {
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Requerido para la conexión SSL con Railway
        },
      }
    : {},
});

const Appointment = defineAppointment(sequelize); 
const Admin = defineAdmin(sequelize)

module.exports = { sequelize, Appointment, Admin };






