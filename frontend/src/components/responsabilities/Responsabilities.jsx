import React from "react";
import styles from "./Responsabilities.module.css";

const Responsabilities = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <h2>Atención personalizada</h2>   
        <p>
          Brindamos el mejor servicio con profesionalismo, siempre procurando
          atender las necesidades de tu mascota.
        </p>
      </div>
      <div className={styles.middle_container}>
        <h2>Variedad de productos</h2>
        <p>
          Sentimos la obligación de ofrecer una amplia variedad de productos
          para que encuentres todo lo que tu mascota necesita en un solo lugar.
        </p>
      </div>
      <div className={styles.right_container}>
        <h2>Los mejores precios siempre</h2>
        <p>
          Nos encargamos de ofrecer siempre los mejores precios, garantizando
          productos de alta calidad para tu mascota sin comprometer tu
          presupuesto.{" "}
        </p>
      </div>
    </div>
  );
};

export default Responsabilities;
