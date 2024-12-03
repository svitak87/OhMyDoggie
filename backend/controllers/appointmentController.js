const { Op } = require("sequelize");
const { Appointment } = require("../database");


//crear turno
const addAppointment = async (appointmentData) => {
  const { fullName, email, phoneNumber, services, petName, message, dateTime } =
    appointmentData;
  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !services ||
    !petName ||
    !message 
  ) {
    throw new Error("Los datos obligatorios deben ser proporcionados");
  }
  if (
    (services.transport || services.grooming) &&
    !dateTime
  ) {
    throw new Error("La fecha y hora son obligatorias para los servicios seleccionados");
  }
  const appointmentCreated = await Appointment.create(appointmentData);
  return appointmentCreated;
};

//traer todos los turnos
const getAllAppointments = async () => {
  try {
    const allAppointments = await Appointment.findAll({
      attributes: ["fullName", "email", "phoneNumber", "services", "dateTime", "id", "assignTo"],
    });
    if (allAppointments.length > 0) {
      return allAppointments
    } else {
      throw new Error("There are no appointments");
    }
  } catch (error) {
    throw error;
  }
};

//asignar turno a un colborador
const assignColaborator = async (data) => {
  const { colaborator, id } = data;
  try {
    if (!id) {
      throw new Error("id is required");
    } else {
      const appointmentFound = await Appointment.findOne({
        where: { id: id },
      });
      if (appointmentFound) {
        await Appointment.update(
          { assignTo: colaborator },
          { where: { id: id } }  
        );
      }
    }
  } catch (error) {
    console.error('Error in updateAppointment:', error);
    throw error;
  }
};

//actualizar el turno
const updateAppointment = async (appointmentData) => {
  try {
    const { email, newEmail, newPhoneNumber, newDateTime, id } = appointmentData;

    if (id) {
      const existingAppointment = await Appointment.findOne({
        where: { id: id },
      });

      if (existingAppointment) {
        const [affectedCount] = await Appointment.update(
          {
            email: newEmail || existingAppointment.email,
            phoneNumber: newPhoneNumber || existingAppointment.phoneNumber,
            dateTime: newDateTime || existingAppointment.dateTime
          },
          { where: { id: id } }
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
    const stringData = String(appointmentData);
    const lowercaseQuery = stringData.toLowerCase();

    const appointmentsFound = await Appointment.findAll({
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
              [Op.iLike]: `%${lowercaseQuery}%`,
            },
          },
          {
            dateTime: {
              [Op.iLike]: `%${lowercaseQuery}%`,
            },
          }
        ],
      },
    });

    if (appointmentsFound.length > 0) {
      const appointments = appointmentsFound.map(appointment => ({
        id: appointment.id,
        fullName: appointment.fullName,
        email: appointment.email,
        phoneNumber: appointment.phoneNumber,
        services: appointment.services,
        dateTime: appointment.dateTime,
        assignTo: appointment.assignTo
      }));

      return appointments;  
    } else {
      return null
    }
  } catch (error) {
    throw error;
  }
};


module.exports = {
  addAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentByQuery,
  assignColaborator 
};
