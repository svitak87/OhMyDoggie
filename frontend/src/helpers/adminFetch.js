export const loguinAdmin = async (adminData) => {
    try {
      const response = await fetch("http://localhost:3002/login-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });
      if (!response.ok) {
        return { success: false }; // Devuelve un objeto que indica fallo
      }
      const result = await response.json();
      console.log(result);
      return { success: true, data: result }; // Devuelve un objeto que indica éxito
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      return { success: false, error: error.message }; // Maneja errores de red o servidor
    }
  };

export const fetchAppointments = async () => {
  try {
    const response = await fetch("http://localhost:3002/all-appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if(!response.ok){
      return {succes: false}
    }
    const result = await response.json();
    return result
  } catch (error) {
    return error
  }
}
  
  export default {loguinAdmin, fetchAppointments};
  