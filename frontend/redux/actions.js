export const GET_ALL_APPOINTMENTS = "GET_ALL_APPOINTMENTS";
export const CREATE_APPOINTMENT = "CREATE_APPOINTMENT";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOG_OUT_ADMIN = "LOG_OUT_ADMIN";
export const UPDATE_APPOINTMENT = "UPDATE_APPOINTMENT";
export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";
export const FIND_BY_QUERY = "FIND_BY_QUERY";
export const ORDER_BY_DATE = "ORDER_BY_DATE";
export const ORDER_BY_HOUR = "ORDER_BY_HOUR";
export const FILTER_BY_SERVICE = "FILTER_BY_SERVICE";
export const ASSIGN_APPOINTMENT = "ASSIGN_APPOINTMENT";
export const FILTER_BY_COLABORATOR = "FILTER_BY_COLABORATOR";

import axios from "axios";

export const loginAdmin = (adminData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/login-admin",
        adminData
      );
      dispatch({ type: LOGIN_ADMIN, payload: response.data.token });
    } catch (error) {
      throw error;
    }
  };
};

export const logOutAdmin = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT_ADMIN });
  };
};

export const orderByDate = (order) => {
  return (dispatch) => {
    dispatch({ type: ORDER_BY_DATE, payload: order });
  };
};
export const orderByHour = (order) => {
  return (dispatch) => {
    dispatch({ type: ORDER_BY_HOUR, payload: order });
  };
};

export const filterByService = (service) => {
  return (dispatch) => {
    dispatch({ type: FILTER_BY_SERVICE, payload: service });
  };
};

export const filterByColaborator = (colaborator) => {
  return (dispatch) => {
    dispatch({type: FILTER_BY_COLABORATOR, payload: colaborator})
  }
}

export const getAllAppointments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3002/all-appointments"
      );
      
      dispatch({ type: GET_ALL_APPOINTMENTS, payload: response.data });
    } catch (error) {
      if (error.message && error.response.status === 500) {
        return { error: error.response };
      }
    }
  };
};

export const createAppointment = (appointmentData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/add-appointment",
        appointmentData
      );
      dispatch({ type: CREATE_APPOINTMENT, payload: response.data });
    } catch (error) {
      if (error.message && error.response.status === 500) {
        return { error: error.response };
      }
    }
  };
};

export const updateAppointment = (appointmentData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        "http://localhost:3002/update_appointment",
        appointmentData
      );
      dispatch({ type: UPDATE_APPOINTMENT, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
};

export const assignAppointment = (colaborator, id) => {
  return async (dispatch) => {
    try {
      const data = { colaborator, id };
      const response = await axios.put("http://localhost:3002/assign-colaborator", data);

      dispatch({ type: ASSIGN_APPOINTMENT, payload: response.data });
    } catch (error) {
      console.error("Error assigning appointment:", error);
      throw error;
    }
  }
}

export const deleteAppointment = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/delete-appointment/${id}`
      );
      dispatch({ type: DELETE_APPOINTMENT, payload: response.data });
    } catch (error) {
      throw error;
    }
  };
};


export const getAppointmentByQuery = (value) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/search-by-query?value=${value}`
      );

      if (response.status !== 200) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }

      const appointment = response.data.appointments;

      if (!appointment) {
        throw new Error("No hay turnos con ese parámetro de búsqueda");
      }
      dispatch({ type: FIND_BY_QUERY, payload: appointment });
    } catch (error) {
      throw error;
    }
  };
};
