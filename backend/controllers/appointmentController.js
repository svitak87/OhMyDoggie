const { Op } = require('sequelize');
const { Appointment } = require("../database"); 

const addAppointment = async (appointmentData) => {
  const { fullName, email, phoneNumber, services, petName, message, dateTime } = appointmentData;

  if (!fullName || !email || !phoneNumber || !services || !petName || !message || !dateTime) {
    throw new Error("Se deben ingresar todos los datos");
  } else {
    const appointmentCreated = await Appointment.create(appointmentData);
    return appointmentCreated;
  }
};

// Backend: controllers/verifyAppointment.js


const verifyAppointment = async (date) => {
  try {
    // Asegúrate de que la fecha sea válida
    if (!date || isNaN(Date.parse(date))) {
      throw new Error('Fecha inválida');
    }
    
    // Convertir la fecha ISO a la zona horaria correcta
    const appointmentDate = new Date(date);
    const startOfDay = new Date(appointmentDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(appointmentDate.setUTCHours(23, 59, 59, 999));

    const appointments = await Appointment.findAll({
      where: {
        dateTime: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });


    const occupiedTimes = appointments.map(app => {
      // Formatear la fecha según el formato de la base de datos
      return new Date(app.dateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    });

    return occupiedTimes;
  } catch (error) {
    throw new Error(`Error al verificar la disponibilidad: ${error.message}`);
  }
};

module.exports = {addAppointment, verifyAppointment} ;
