const express = require("express");
const route = express.Router();
const { addAppointment, verifyAppointment } = require("../controllers/appointmentController");

route.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Servidor levantado" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear turno
route.post("/add-appointment", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, services, petName, message, dateTime } = req.body;
    await addAppointment({ fullName, email, phoneNumber, services, petName, message, dateTime });
    res.status(200).json({ message: "Turno agendado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar turno
route.get('/verify-appointment', async (req, res) => {
  try {
    const { date } = req.query;
    console.log('Received date:', date); // Agregar este log para depurar
    const occupiedTimes = await verifyAppointment(date);
    res.status(200).json({ occupiedTimes });
  } catch (error) {
    console.error('Error en la ruta:', error); // Agregar este log para depurar
    res.status(500).json({ error: error.message });
  }
});


module.exports = route;
