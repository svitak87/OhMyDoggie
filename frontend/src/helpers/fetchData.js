import data from "../databases/brands.json";

export const fetchBrands = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
    if (!data) {
      reject({ error: "No hay data" });
    }
  });
};

export const addAppointment = async (appointmentData) => {
  try {
    const response = await fetch("http://localhost:3002/add-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(appointmentData), 
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json(); 
    console.log(result);
    return result; 
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error; 
  }
};

export default { fetchBrands, addAppointment };
