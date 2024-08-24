import React from 'react'
import styles from "./Appointment.module.css"

const Appointment = ({fullName, email, phoneNumber, services, dateTime}) => {
  return (
    <div className={styles.container}>
      <h2>{fullName}</h2>
      <h3>{email}</h3>
      <h3>{phoneNumber}</h3>
      <ul className={styles.list_container}>
        <li>Transporte: {services.transport ? 'Sí' : 'No'}</li>
        <li>Baño y peluquería: {services.grooming ? 'Sí' : 'No'}</li>
      </ul>
      <p>{dateTime}hrs</p>
    </div>
  )
}

export default Appointment
