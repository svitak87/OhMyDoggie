const { Op } = require("sequelize");
const { Appointment } = require("../database");

const addAppointment = async (appointmentData) => {
  const { fullName, email, phoneNumber, services, petName, message, dateTime } =
    appointmentData;

  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !services ||
    !petName ||
    !message ||
    !dateTime
  ) {
    throw new Error("All data are required");
  } else {
    const appointmentCreated = await Appointment.create(appointmentData);
    return appointmentCreated;
  }
};

const getAllAppointments = async () => {
  try {
    const allAppointments = await Appointment.findAll({
      attributes: [
        "fullName",
        "email",
        "phoneNumber",
        "services",
        "dateTime",
      ],
    });

    if (allAppointments.length > 0) {
      // Mapear los resultados para formatear dateTime
      const formattedAppointments = allAppointments.map((appointment) => {
        const date = new Date(appointment.dateTime);
        
        // Obtener componentes de la fecha
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        // Formatear `dateTime` en "YYYY-MM-DD HH:mm"
        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
        
        // Retornar el objeto con `dateTime` formateado
        return {
          ...appointment.toJSON(),
          dateTime: formattedDateTime,
        };
      });

      return formattedAppointments;
    } else {
      throw new Error("There are no appointments");
    }
  } catch (error) {
    throw error;
  }
};



const verifyAppointment = async (date) => {
  try {
    // Asegúrate de que la fecha sea válida
    if (!date || isNaN(Date.parse(date))) {
      throw new Error("Fecha inválida");
    }

    // Convertir la fecha ISO a la zona horaria correcta
    const appointmentDate = new Date(date);
    const startOfDay = new Date(appointmentDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(appointmentDate.setUTCHours(23, 59, 59, 999));

    const appointments = await Appointment.findAll({
      where: {
        dateTime: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });
    const occupiedTimes = appointments.map((app) => {
      // Formatear la fecha según el formato de la base de datos
      return new Date(app.dateTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    return occupiedTimes;
  } catch (error) {
    throw new Error(`Error al verificar la disponibilidad: ${error.message}`);
  }
};

module.exports = { addAppointment, verifyAppointment, getAllAppointments };
