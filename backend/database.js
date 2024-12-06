require("dotenv").config();
const { Sequelize } = require("sequelize");
const defineAppointment = require("./models/appointment");
const defineAdmin = require("./models/adminModel");

const isProduction = process.env.NODE_ENV === "production";
console.log("Database URL:", process.env.DATA_BASE_PUBLIC);

let sequelize;

try {
  sequelize = new Sequelize(process.env.DATA_BASE_PUBLIC, {
    dialect: "postgres", // Asegúrate de que el dialecto sea explícito
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  });
  const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATA_BASE_PUBLIC, // Usa tu URL de conexión
});

client.connect()
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
    client.end();
  })
  .catch(err => {
    console.error("Error al conectar a la base de datos:", err);
  });


  console.log("Sequelize initialized successfully!");
} catch (err) {
  console.error("Error initializing Sequelize:", err);
  process.exit(1); // Finaliza el proceso si hay un error crítico
}

// Modelos
const Appointment = defineAppointment(sequelize);
const Admin = defineAdmin(sequelize);

module.exports = { sequelize, Appointment, Admin };





