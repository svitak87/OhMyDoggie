const express = require("express");
const route = express.Router();
const { addAdmin, loginAdmin } = require("../controllers/adminControllers");
const { generateToken } = require("../utils/jwtAuthPayload");

route.post("/add-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newAddmin = await addAdmin({ name, email, password });
    if (newAddmin) {
      res.status(200).json({ message: "Administrator succesfully created" });
    }
  } catch (error) {
    if (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

route.post("/login-admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await loginAdmin({ email, password });
    if (admin) {
      const token = generateToken(admin);
      res.status(200).json({ admin: admin, token: token , message: "Admin logued succesfully"});
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    if (error) {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
});

module.exports = route;
