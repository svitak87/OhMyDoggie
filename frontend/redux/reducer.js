import { GET_ALL_APPOINTMENTS, LOG_OUT_ADMIN, LOGIN_ADMIN } from "./actions";

const initialState = {
  appointments: [],
  admin: {},
  token: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
      };
    case LOGIN_ADMIN:
      return {
        ...state,
        token: payload,
      };
    case LOG_OUT_ADMIN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
