import {
  GET_ALL_APPOINTMENTS,
  LOG_OUT_ADMIN,
  LOGIN_ADMIN,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  FIND_BY_QUERY,
  ORDER_BY_DATE,
  ORDER_BY_HOUR,
  FILTER_BY_SERVICE,
  ASSIGN_APPOINTMENT,
  FILTER_BY_COLABORATOR,
} from "./actions";

const initialState = {
  appointments: [],
  allAppointments: [],
  admin: {},
  token: localStorage.getItem("token"),
  colaboratorsAppointments: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
        allAppointments: payload,
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
      return {
        ...state,
        appointment: payload,
      };

    case DELETE_APPOINTMENT:
      // Eliminar la cita tanto de appointments (las filtradas) como de allAppointments (todas las citas).
      const updatedAllAppointments = state.allAppointments.filter(
        (appointment) => appointment.id !== payload
      );

      // Eliminar del array filtrado actual (appointments)
      const updatedFilteredAppointments = state.appointments.filter(
        (appointment) => appointment.id !== payload
      );

      return {
        ...state,
        allAppointments: updatedAllAppointments,
        appointments: updatedFilteredAppointments, 
      };

    case ORDER_BY_DATE:
      const orderDate = [...state.appointments];
      return {
        ...state,
        appointments: orderDate.sort((a, b) => {
          const parseDate = (dateStr) => {
            const [day, month, year, time] = dateStr.split(/[/\s:]+/);
            return new Date(`${year}-${month}-${day}T${time}:00`);
          };
          const dateA = parseDate(a.dateTime);
          const dateB = parseDate(b.dateTime);

          if (payload === "ascending") {
            return dateA - dateB;
          } else if (payload === "descending") {
            return dateB - dateA;
          }
          return 0;
        }),
      };

    case ORDER_BY_HOUR:
      const orderHour = [...state.appointments];
      return {
        ...state,
        appointments: orderHour.sort((a, b) => {
          const parseTime = (dateStr) => {
            const [, , , hour, minute] = dateStr.split(/[/\s:]+/);
            return new Date(1970, 0, 1, hour, minute);
          };

          const timeA = parseTime(a.dateTime);
          const timeB = parseTime(b.dateTime);

          if (payload === "ascending") {
            return timeA - timeB;
          } else if (payload === "descending") {
            return timeB - timeA;
          }
          return 0;
        }),
      };

    case FILTER_BY_SERVICE:
      let filteredByService;

      if (payload === "all") {
        filteredByService = [...state.allAppointments];
      } else {
        filteredByService = state.allAppointments.filter((appointment) => {
          switch (payload) {
            case "transport":
              return appointment.services.transport;
            case "grooming":
              return appointment.services.grooming;
            case "rideRecreation":
              return appointment.services.rideRecreation;
            case "transport&grooming":
              return (
                appointment.services.grooming && appointment.services.transport
              );
            case "other":
              return appointment.services.other;
            default:
              return false;
          }
        });
      }

      return {
        ...state,
        appointments: filteredByService,
      };

    case FIND_BY_QUERY:
      return {
        ...state,
        appointments: payload,
      };
      case ASSIGN_APPOINTMENT:
        const { id, colaborator } = payload;

        const updatedAppointments = state.appointments.map((appointment) =>
          appointment.id === id
        ? { ...appointment, assignTo: colaborator }
        : appointment
      );
        const updatedAll = state.allAppointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, assignTo: colaborator }
            : appointment
        );
        return {
          ...state,
          appointments: updatedAppointments,
          allAppointments: updatedAll // Asegúrate de que `allAppointments` también se actualice
        };
      

    case FILTER_BY_COLABORATOR:
      const filteredAppointments = state.allAppointments.filter((appointment) => appointment.assignTo === payload)
      return {
        ...state,
        appointments: filteredAppointments
      };

    default:
      return state;
  }
};

export default rootReducer;
