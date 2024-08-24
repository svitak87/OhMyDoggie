require("dotenv").config();
const { Sequelize } = require("sequelize");
const defineAppointment = require("./models/appointment"); // Importa la función que define el modelo
const defineAdmin = require("./models/adminModel")

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ohmydoggie`,
  {
    logging: false,
    native: false,
  }
);

// Define el modelo 'Appointment' con Sequelize
const Appointment = defineAppointment(sequelize); 
const Admin = defineAdmin(sequelize)

module.exports = { sequelize, Appointment, Admin };



