const { Op } = require("sequelize");
const { Appointment } = require("../database");
const appointment = require("../models/appointment");

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
      attributes: ["fullName", "email", "phoneNumber", "services", "dateTime", "id"],
    });

    if (allAppointments.length > 0) {
      // const formattedAppointments = allAppointments.map((appointment) => {
      //   const date = new Date(appointment.dateTime);
      //   const year = date.getFullYear();
      //   const month = String(date.getMonth() + 1).padStart(2, "0"); 
      //   const day = String(date.getDate()).padStart(2, "0");
      //   const hours = String(date.getHours()).padStart(2, "0");
      //   const minutes = String(date.getMinutes()).padStart(2, "0");
      //   const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
      //   return {
      //     ...appointment.toJSON(),
      //     dateTime: formattedDateTime,
      //   };
      // });

      // return formattedAppointments;
      return allAppointments
    } else {
      throw new Error("There are no appointments");
    }
  } catch (error) {
    throw error;
  }
};

const updateAppointment = async (appointmentData) => {
  try {
    const { email, newEmail, newPhoneNumber, newDateTime } = appointmentData;

    if (email) {
      const existingAppointment = await Appointment.findOne({
        where: { email: email },
      });

      if (existingAppointment) {
        const [affectedCount] = await Appointment.update(
          {
            email: newEmail || existingAppointment.email,
            phoneNumber: newPhoneNumber || existingAppointment.phoneNumber,
            dateTime: newDateTime || existingAppointment.dateTime
          },
          { where: { email: email } }
        );
        if (affectedCount > 0) {
          return { message: "Appointment successfully updated" };
        } else {
          throw new Error("No changes were made to the appointment");
        }
      } else {
        throw new Error("Appointment does not exist");
      }
    } else {
      throw new Error("Email is required");
    }
  } catch (error) {
    console.error('Error in updateAppointment:', error);
    throw error;
  }
};


//eliminar un turno

const deleteAppointment = async (id) => {
  try {
    const appointmentFound = await Appointment.findByPk(id)
    if(appointmentFound){
      await appointmentFound.destroy()
      return appointmentFound.id
    }
  } catch (error) {
    throw new Error("Appointment does not exist")
  }
}

//buscar turno por número de teléfono, por email o nombre 

const getAppointmentByQuery = async (appointmentData) => {
  try {
    const stringData = String(appointmentData)
    const lowercaseQuery = stringData.toLowerCase();

    const appointmentFound = await Appointment.findAll({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.iLike]: `%${lowercaseQuery}%`,
            },
          },
          {
            phoneNumber: {
              [Op.iLike]: `%${lowercaseQuery}%`,
            },
          },
          {
            fullName: {
              [Op.iLike]: `%${lowercaseQuery}`,
            },
          }
        ],
      },
    });
    if(appointmentFound.length > 0){
      const appointment = {
        id: appointmentFound[0].id,
        fullName: appointmentFound[0].fullName, 
        email: appointmentFound[0].email,
        phoneNumber: appointmentFound[0].phoneNumber,
        services: appointmentFound[0].services,
        dateTime: appointmentFound[0].dateTime,
      }
      return appointment
    }else{
      throw new Error("There is not an appointment with data")
    }
  } catch (error) {
    throw error
  }
}


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

module.exports = {
  addAppointment,
  verifyAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentByQuery
};
