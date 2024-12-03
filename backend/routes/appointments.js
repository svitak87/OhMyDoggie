const express = require("express");
const route = express.Router();
const {
  addAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentByQuery,
  assignColaborator
} = require("../controllers/appointmentController");
const {
  sendContactEmail,
  confirmationEmail,
} = require("../gmailConfig/gmailConfig");

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

//asignar turno a un colabordor
route.put("/assign-colaborator", async (req, res) => {
  try {
    const { id, colaborator } = req.body;
    await assignColaborator({colaborator, id});
    res.status(201).json({ colaborator: colaborator, id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear turno en la base de datos
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
      assignTo = null,
    } = req.body;
    await addAppointment({
      fullName,
      email,
      phoneNumber,
      services,
      petName,
      message,
      dateTime,
      assignTo,
    });
    await sendContactEmail({
      fullName,
      email,
      phoneNumber,
      services,
      petName,
      message,
      dateTime,
    });
    await confirmationEmail({ fullName, email, services, petName, dateTime });
    res.status(201).json({ message: "Turno agendado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar turno en la base de datos (email, phoneNumber, dateTime)

route.put("/update_appointment", async (req, res) => {
  try {
    const { email, newEmail, newPhoneNumber, newDateTime, id } = req.body;
    
    await updateAppointment({
      id,
      email,
      newEmail,
      newPhoneNumber,
      newDateTime,
    });
    res.status(201).json({ message: "appointment succesfully updated" });
  } catch (error) {
    if (error) {
      res.status(403).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//eliminar turno de la base de datos
route.delete("/delete-appointment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAppointment(id);
    res.status(200).json(result);
  } catch (error) {
    if (error) {
      res.status(404).json({ error: error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//buscar por palabra clave
route.get("/search-by-query", async (req, res) => {
  try {
    const { value } = req.query;
    if (!value) {
      return res.status(403).json({ error: "A query must be needed" });
    } else {
      const results = await getAppointmentByQuery(value);
      if (results) {
        res.status(200).json({ appointments: results });
      } else {
        res
          .status(404)
          .json({ error: "No appointment found with the provided data" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = route;
