import React from "react";
import styles from "./TablePrices.module.css";

const TablePrices = () => {
  return (
    <div className={styles.container}>
      <div className={styles.conventionContainer}>
        <p>
          <span className={styles.greenBluePoint}></span> Baño y peluquería 
        </p>
        <p>
          <span className={styles.yellowPoint}></span> Paseo y recreación
        </p>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {/* Baño y peluquería (verde azulado) */}
          <tr>
            <td>
              <span className={styles.greenBluePoint}></span> BAÑO SUPER MINI DOGGIE
            </td>
            <td>70.000</td>
          </tr>
          <tr>
            <td>
              <span className={styles.greenBluePoint}></span> BAÑO SUPER SUPER DOGGIE
            </td>
            <td>80.000</td>
          </tr>
          <tr>
            <td>
              <span className={styles.greenBluePoint}></span> TOTAL MINI DOGGIE
            </td>
            <td>85.000</td>
          </tr>
          <tr>
            <td>
              <span className={styles.greenBluePoint}></span> TOTAL SUPER DOGGIE
            </td>
            <td>110.000</td>
          </tr>
          <tr>
            <td>
              <span className={styles.greenBluePoint}></span> TOTAL PROTECT MINI DOGGIE
            </td>
            <td>105.000</td>
          </tr>
          <tr>
            <td>
              <span className={styles.greenBluePoint}></span> TOTAL PROTECT SUPER DOGGIE
            </td>
            <td>130.000</td>
          </tr>

          {/* Paseo y recreación (amarillo) */}
          <tr>
            <td>
              <span className={styles.yellowPoint}></span> AIR DOGGIE
            </td>
            <td>15.000</td>
          </tr>
          <tr>
            <td>
              <span className={styles.yellowPoint}></span> REST DOGGGIE
            </td>
            <td>25.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePrices;


