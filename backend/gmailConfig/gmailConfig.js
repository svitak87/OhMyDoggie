require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path'); 

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
      if (service === "grooming") return "Baño y Peluquería";
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

    await transporter.sendMail({
      from: `"Oh My Doggie 🐶" <${process.env.GMAIL_EMAIL}>`,
      to: email,
      subject: `Turno confirmado para ${petName} ✔`,
      html: htmlTemplate, 
      attachments: [
        {
          filename: 'logo_footer.jpg',
          path: path.join(__dirname, '../public/logo_footer.jpg'), // Ruta local de la imagen
          cid: 'logo_footer', // Identificador único para la imagen
        },
      ],
    });
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};


  const sendContactEmail = async ({ fullName, email, phoneNumber, services, petName, message, dateTime }) => {
    // Filtrar los servicios que tienen valor true
    const selectedServices = Object.keys(services)
      .filter(service => services[service]) 
      .map(service => {
        if (service === "transport") return "Transporte";
        if (service === "grooming") return "Baño y Peluquería";
        if (service === "rideRecreation") return "Paseo y recreación";
        if (service === "other") return "Otro servicio";
        return service; 
      }).join(', '); 
  
    try {
      const info = await transporter.sendMail({
        from: `"${email}" <${process.env.GMAIL_EMAIL}>`,
        to: process.env.GMAIL_EMAIL,
        subject: "Nuevo turno agendado",
        text: `Mensaje de: ${fullName}\n\nMensaje: ${message} \n\nTeléfono: ${phoneNumber} \n\nServicios: ${selectedServices} \n\nMascota: ${petName} \n\nFecha y hora: ${dateTime}hs`,
      });
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw error;
    }
  };
  

module.exports = {sendContactEmail, confirmationEmail};
  
