import React, { useEffect } from "react";
import { getAllAppointments } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./Appointment";
import styles from "./Appointments.module.css";
import Navbar from "../extraComponents/Navbar";
import SearchBar from "./searchAppointment/SearchAppointment";
import OrderAppointments from "./orderAppointments/OrderAppointments";
const Appointments = () => {
  const appointments = useSelector((state) => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <SearchBar />
      <OrderAppointments />
      <div className={styles.container}>
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <Appointment
              key={appointment.id || index}
              id={appointment.id}
              fullName={appointment.fullName}
              email={appointment.email}
              phoneNumber={appointment.phoneNumber}
              services={appointment.services}
              dateTime={appointment.dateTime}
              assignTo={appointment.assignTo}
            />
          ))
        ) : (
          <h2>No hay turnos OH MY DOGGGIE</h2>
        )}
      </div>
    </>
  );
};

export default Appointments;

