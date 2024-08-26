require("dotenv").config();
const { Sequelize } = require("sequelize");
const defineAppointment = require("./models/appointment"); 
const defineAdmin = require("./models/adminModel")

const { DB_USER, DB_PASSWORD, DB_HOST, DATA_BASE } = process.env;

const sequelize = new Sequelize(
  `${DB_USER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATA_BASE}`,
  {
    logging: false,
    native: false,
  }
);

const Appointment = defineAppointment(sequelize); 
const Admin = defineAdmin(sequelize)

module.exports = { sequelize, Appointment, Admin };



