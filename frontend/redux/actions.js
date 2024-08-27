export const GET_ALL_APPOINTMENTS = "GET_ALL_APPOINTMENTS";
export const CREATE_APPOINTMENT = "CREATE_APPOINTMENT";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOG_OUT_ADMIN = "LOG_OUT_ADMIN";

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
      throw error
    }
  };
};

export const logOutAdmin = () => {
    return (dispatch) => {
      dispatch({ type: LOG_OUT_ADMIN });
    };
};



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
      console.log("estos son lod datos:" + response.data);
      dispatch({ type: CREATE_APPOINTMENT, payload: response.data });
    } catch (error) {
      if (error.message && error.response.status === 500) {
        return { error: error.response };
      }
    }
  };
};
