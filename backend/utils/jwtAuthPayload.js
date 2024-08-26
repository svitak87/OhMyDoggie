const jwt = require("jsonwebtoken");
const { secretKey } = require("../JWTconfig/JWTconfig");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, generateRefreshToken, verifyToken };
