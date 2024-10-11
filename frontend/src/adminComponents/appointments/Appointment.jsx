import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteAppointment, getAllAppointments } from "../../../redux/actions";
import styles from "./Appointment.module.css";
import UpdateAppointment from "./update-delete-appoint/UpdateAppointment";
import { useDispatch } from "react-redux";

const Appointment = ({
  id,
  fullName,
  email,
  phoneNumber,
  services,
  dateTime,
}) => {
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const handleClickUpdate = () => {
    setUpdateForm((prev) => !prev);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAppointment(id));
      await dispatch(getAllAppointments());
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };
  
  

  return (
    <>
      {updateForm ? (
        <UpdateAppointment email={email} setUpdateForm={setUpdateForm} />
      ) : (
        <div className={styles.container}>
          <div className={styles.left_container}>
            <h2 className={styles.fullName}>{fullName}</h2>
            <h3 className={styles.email}>{email}</h3>
            <h3>{phoneNumber}</h3>
            <ul className={styles.list_container}>
              <li>Transporte: {services && services.transport ? "Sí" : "No"}</li>
              <li>Baño y peluquería: {services && services.grooming ? "Sí" : "No"}</li>
              <li>Paseo-Recreación: {services && services.rideRecreation ? "Sí" : "No"}</li>
              <li>Otro: {services && services.other ? "Sí" : "No"}</li>
            </ul>
            <p>{dateTime}hrs</p>
          </div>

          <div className={styles.right_container}>
            <button className={styles.iconButton} onClick={handleClickUpdate} title="Actualizar">
              <FontAwesomeIcon icon={faSync} /> {/* Icono de actualizar */}
            </button>
            <button className={styles.iconButton} onClick={handleDelete} title="Eliminar">
              <FontAwesomeIcon icon={faTrash} /> {/* Icono de eliminar */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;

