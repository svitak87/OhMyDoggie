import {
  GET_ALL_APPOINTMENTS,
  LOG_OUT_ADMIN,
  LOGIN_ADMIN,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  FIND_BY_QUERY,
} from "./actions";

const initialState = {
  appointments: [],
  admin: {},
  token: localStorage.getItem("token"),
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
      };
    case LOGIN_ADMIN:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
      };
    case LOG_OUT_ADMIN:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
      };
    case UPDATE_APPOINTMENT:
      console.log(payload)
      return {
        ...state,
        appointment: payload,
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment.id !== payload
        ),
      };
    case FIND_BY_QUERY:
      return {
        ...state,
        appointments: [payload]
      };
    default:
      return state;
  }
};

export default rootReducer;
