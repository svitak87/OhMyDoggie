import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSync,
  faTrash,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { deleteAppointment } from "../../../redux/actions";
import AssignAppointment from "./assignAppointment/AssignAppointment";
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
  assignTo,
}) => {
  const [updateForm, setUpdateForm] = useState(false);
  const [assignChart, setAssignChart] = useState(false);
  const dispatch = useDispatch();
  console.log(phoneNumber);
  const assignHandler = () => {
    setAssignChart((prev) => !prev);
  };

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
            <h3>
              <a
                href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {phoneNumber}
              </a>
            </h3>
            <ul className={styles.list_container}>
              <li>
                Transporte:{" "}
                <span
                  style={{
                    fontWeight:
                      services && services.transport ? "bold" : "normal",
                  }}
                >
                  {services && services.transport ? "Sí" : "No"}
                </span>
              </li>
              <li>
                Baño y peluquería:{" "}
                <span
                  style={{
                    fontWeight:
                      services && services.grooming ? "bold" : "normal",
                  }}
                >
                  {services && services.grooming ? "Sí" : "No"}
                </span>
              </li>
              <li>
                Paseo-Recreación:{" "}
                <span
                  style={{
                    fontWeight:
                      services && services.rideRecreation ? "bold" : "normal",
                  }}
                >
                  {services && services.rideRecreation ? "Sí" : "No"}
                </span>
              </li>
              <li>
                Otro:{" "}
                <span
                  style={{
                    fontWeight: services && services.other ? "bold" : "normal",
                  }}
                >
                  {services && services.other ? "Sí" : "No"}
                </span>
              </li>
            </ul>

            <p>{dateTime}hrs</p>
            <h2>{assignTo}</h2>
          </div>

          <div className={styles.right_container}>
            <button
              className={styles.iconButton}
              onClick={handleClickUpdate}
              title="Actualizar"
            >
              <FontAwesomeIcon icon={faSync} />
            </button>
            <button
              className={styles.iconButton}
              onClick={handleDelete}
              title="Eliminar"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              className={styles.iconButton}
              onClick={assignHandler}
              title="Asignar"
            >
              <FontAwesomeIcon icon={faUserCheck} />
            </button>
            <div>{assignChart && <AssignAppointment id={id} />}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
