require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path'); // Para manejar rutas

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
});

// Función para reemplazar variables en el HTML
const replaceVariables = (template, variables) => {
  return template.replace(/{{(\w+)}}/g, (_, key) => {
    return variables[key] || '';
  });
};

const confirmationEmail = async ({ fullName, email, services, petName, dateTime }) => {
  const selectedServices = Object.keys(services)
    .filter(service => services[service])
    .map(service => {
      if (service === "transport") return "Transporte";
      if (service === "grooming") return "Peluquería";
      if (service === "rideRecreation") return "Paseo y recreación";
      if (service === "other") return "Otro servicio";
      return service;
    }).join(', ');

  try {
    // Leer el archivo HTML
    const filePath = path.join(__dirname, 'emailAppointment.html');
    let htmlTemplate = fs.readFileSync(filePath, 'utf8');

    // Reemplazar variables en el HTML
    htmlTemplate = replaceVariables(htmlTemplate, { fullName, petName, selectedServices, dateTime });

    // Enviar el correo con el HTML
    await transporter.sendMail({
      from: `"Oh My Doggie" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: `Turno confirmado para ${petName} ✔`,
      html: htmlTemplate, // Usar el contenido HTML reemplazado
    });

    console.log("Correo de confirmación enviado");
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};


  const sendContactEmail = async ({ fullName, email, phoneNumber, services, petName, message, dateTime }) => {
    // Filtrar los servicios que tienen valor true
    const selectedServices = Object.keys(services)
      .filter(service => services[service]) // Solo los que son true
      .map(service => {
        // Opcionalmente, puedes personalizar los nombres de los servicios para que sean más legibles en el correo
        if (service === "transport") return "Transporte";
        if (service === "grooming") return "Peluquería";
        if (service === "rideRecreation") return "Paseo y recreación";
        if (service === "other") return "Otro servicio";
        return service; // Devuelve el nombre original si no se especifica
      }).join(', '); // Convierte la lista en una cadena separada por comas
  
    try {
      const info = await transporter.sendMail({
        from: `"${email}" <${process.env.GMAIL_EMAIL}>`,
        to: process.env.GMAIL_EMAIL,
        subject: "Nuevo turno agendado",
        // Incluye los servicios seleccionados en el texto del correo
        text: `Mensaje de: ${fullName}\n\nMensaje: ${message} \n\nTeléfono: ${phoneNumber} \n\nServicios: ${selectedServices} \n\nMascota: ${petName} \n\nFecha y hora: ${dateTime}`,
      });
      console.log("Correo electrónico enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw error;
    }
  };
  

module.exports = {sendContactEmail, confirmationEmail};
  
// `¡Bienvenido a News Portal!\n\n¡Hola ${fullName}!\n\n¡Gracias por unirte a nuestra comunidad en News Portal! Estamos emocionados de tenerte con nosotros mientras exploras noticias de calidad, actualizaciones en tiempo real y análisis profundos de los eventos que impactan nuestro mundo.\n\nCon tu suscripción, tendrás acceso ilimitado a nuestro contenido exclusivo y a las historias que importan. Prepárate para descubrir una perspectiva única sobre los acontecimientos más relevantes de hoy.\n\nNo dudes en explorar todas las secciones de nuestro portal y a participar activamente en nuestras discusiones. ¡Tu opinión es importante para nosotros!\n\n¡Bienvenido a bordo y que disfrutes de la experiencia News Portal!\n\n¡Saludos!\n\nEl equipo de News Portal`