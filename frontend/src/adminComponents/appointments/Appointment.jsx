import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTrash } from "@fortawesome/free-solid-svg-icons"; // Importar los iconos
import styles from "./Appointment.module.css";

const Appointment = ({ fullName, email, phoneNumber, services, dateTime }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <h2 className={styles.fullName}>{fullName}</h2>
        <h3 className={styles.email}>{email}</h3>
        <h3>{phoneNumber}</h3>
        <ul className={styles.list_container}>
          <li>Transporte: {services.transport ? "Sí" : "No"}</li>
          <li>Baño y peluquería: {services.grooming ? "Sí" : "No"}</li>
        </ul>
        <p>{dateTime}hrs</p>
      </div>

      <div className={styles.right_container}>
        <button className={styles.iconButton}>
          <FontAwesomeIcon icon={faSync} /> {/* Icono de actualizar */}
        </button>
        <button className={styles.iconButton}>
          <FontAwesomeIcon icon={faTrash} /> {/* Icono de eliminar */}
        </button>
      </div>
    </div>
  );
};

export default Appointment;
