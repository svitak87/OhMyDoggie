const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const router = require("./routes/appointments");
const adminRoute = require("./routes/adminRoutes");
const { sequelize } = require("./database"); // Importar configuración de Sequelize

const server = express();

// Middlewares
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(compression());
server.use(express.urlencoded({ extended: true }));

// Rutas
server.use(router);
server.use(adminRoute);

// Limitar peticiones
const serverLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // Límite de 20 solicitudes
  message: "Too many requests from this IP, please try again later.",
});
server.use(serverLimiter);

// Conectar a la base de datos y arrancar el servidor
const main = async () => {
  try {
    // Probar la conexión a la base de datos
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    // Sincronizar modelos
    await sequelize.sync({ force: false });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Finaliza el proceso si hay un error
  }
};

main();

// Exporta la instancia del servidor para Vercel
module.exports = server;
