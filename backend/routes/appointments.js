const express = require("express");
const route = express.Router();
const {
  addAppointment,
  verifyAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");

//traer todos los turnos de la base de datos
route.get("/all-appointments", async (req, res) => {
  try {
    const allAppointments = await getAllAppointments();
    if (allAppointments.length > 0) {
      res.status(200).json(allAppointments);
    }
  } catch (error) {
    if (error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Crear turno
route.post("/add-appointment", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      services,
      petName,
      message,
      dateTime,
    } = req.body;
    await addAppointment({
      fullName,
      email,
      phoneNumber,
      services,
      petName,
      message,
      dateTime,
    });
    res.status(200).json({ message: "Turno agendado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar turno
route.get("/verify-appointment", async (req, res) => {
  try {
    const { date } = req.query;
    console.log("Received date:", date); // Agregar este log para depurar
    const occupiedTimes = await verifyAppointment(date);
    res.status(200).json({ occupiedTimes });
  } catch (error) {
    console.error("Error en la ruta:", error); // Agregar este log para depurar
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;
