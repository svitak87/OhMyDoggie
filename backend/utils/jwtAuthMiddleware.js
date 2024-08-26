const jwt = require("jsonwebtoken");
const { secretKey } = require("../JWTconfig/JWTconfig");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: invalid token format" });
  }

  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Forbidden: invalid token" });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authenticateToken;