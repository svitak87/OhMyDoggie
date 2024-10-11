require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression"); // Agregar la librería de compresión
const rateLimit = require("express-rate-limit");
const router = require("./routes/appointments");
const adminRoute = require("./routes/adminRoutes");
const { sequelize } = require("./database");

const PORT = process.env.PORT || 3002;
const server = express();

// Limitar peticiones
const serverLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

// Middlewares
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(serverLimiter);
server.use(express.urlencoded({ extended: true }));

// Habilitar compresión Brotli y Gzip
server.use(compression({
  filter: (req, res) => {
    // Aplicar la compresión solo si la solicitud lo permite
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  brotli: {
    enabled: true, // Habilitar Brotli si el navegador lo soporta
    zlib: { level: 11 }  // Nivel de compresión máximo para Brotli
  }
}));

// Rutas
server.use(router);
server.use(adminRoute);

// Conectar a la base de datos y arrancar el servidor
const main = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connected to the database ohmydoggie");
    server.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
