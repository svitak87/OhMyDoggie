const express = require("express");
const route = express.Router();
const { addAdmin, loginAdmin } = require("../controllers/adminControllers");

route.post("/add-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newAddmin = await addAdmin({ name, email, password });
    if (newAddmin) {
      res.status(200).json({ message: "Administratos succesfully created" });
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
    const loguedAdmin = await loginAdmin({ email, password });
    if (loguedAdmin) {
      res.status(200).json({ message: "Admin logued succesfully" });
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
