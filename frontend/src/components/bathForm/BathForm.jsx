import React from "react";
import styles from "./BathForm.module.css";
import NavbarBath from "../navbar/NavbarBath";

const BathForm = () => {
  return (
    <>
      <NavbarBath />
      <div className={styles.container}>
        <div className={styles.left_container}>
          <h2>¡Bienvenidos al servicio de baño y peluquería!</h2>
          <h3>¿Cómo funciona?</h3>
          <ul>
            <li>1. Completa el formulario con los datos solicitados.</li>
            <li>
              2. Una vez enviado, recibirás un correo de confirmación.
              <p className={styles.notice}>
                <em>(No olvides revisar tu carpeta de spam)</em>
              </p>
            </li>
            <li>
              3. Te contactaremos 24 horas antes de tu cita al número que nos
              proporcionaste para confirmar el servicio.
            </li>
            <li>4. ¡Tu peludito estará reluciente y feliz! 🐶</li>
          </ul>
        </div>
        <div className={styles.right_container}></div>
      </div>
    </>
  );
};

export default BathForm;
