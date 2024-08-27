import React, { useEffect } from "react";
import { getAllAppointments } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./Appointment";
import styles from "./Appointments.module.css";
import Navbar from "../extraComponents/Navbar";

const Appointments = () => {
  const appointments = useSelector((state) => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  return (
    <>
    <Navbar />
      <div className={styles.container}>
        {appointments.length > 0 &&
          appointments.map((appointment, index) => (
            <Appointment
              key={appointment.id || index}
              fullName={appointment.fullName}
              email={appointment.email}
              phoneNumber={appointment.phoneNumber}
              services={appointment.services}
              dateTime={appointment.dateTime}
            />
          ))}
      </div>
    </>
  );
};

export default Appointments;
