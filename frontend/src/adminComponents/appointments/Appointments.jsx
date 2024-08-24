import React, { useEffect, useState } from "react";
import { fetchAppointments } from "../../helpers/adminFetch";
import Appointment from "./Appointment";
import styles from "./Appointments.module.css"


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        if (data) {
          setAppointments(data); 
        }
      } catch (error) {
        return error;
      }
    };

    getAppointments();
  }, []);

  console.log(appointments);
  return (
    <>
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
