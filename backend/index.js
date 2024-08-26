require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const router = require("./routes/appointments");
const adminRoute = require("./routes/adminRoutes");
const { sequelize } = require("./database");

const PORT = process.env.PORT || 3002;
const serverLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: "Too many requests from this IP, please try again later.",
});

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(serverLimiter);
server.use(express.urlencoded({ extended: true }));

server.use(router);
server.use(adminRoute);

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
