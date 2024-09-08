import React from "react";
import styles from "./BathForm.module.css";
import NavbarBath from "../navbar/NavbarBath";
import FormData from "./FormData";
import TablePrices from "./TablePrices";

const BathForm = () => {
  return (
    <>
      <NavbarBath />
      <div className={styles.container}>
        <div className={styles.left_container}>
          <h2>Bienvenidos a la agenda de servicios.</h2>
          <h3>¿Cómo funciona?</h3>
          <ul>
            <li>1. Completa el formulario con los datos solicitados.</li>
            <li>
              2. Una vez enviado, recibirás un correo de confirmación.
              <p className={styles.notice}>
                <em>*No olvides revisar tu carpeta de spam</em>
              </p>
            </li>
            <li>
              3. Te contactaremos 24 horas antes de tu cita al número que nos
              proporcionaste para confirmar el servicio.
            </li>
            <li>4. Vamos por él ó tu lo traes; dependiendo de los servicios que selecciones.</li>
            <li>5. ¡Tu peludito estará reluciente y feliz! 🐶</li>
          </ul>
          <div className={styles.table_container}>
            <TablePrices />
          </div>
        </div>
        <div className={styles.right_container}>
          <FormData />
        </div>
      </div>
    </>
  );
};

export default BathForm;
