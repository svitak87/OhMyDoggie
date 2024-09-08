import React from "react";
import styles from "./TablePrices.module.css";

const TablePrices = () => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BAÑO SUPER MINI DOGGIE</td>
            <td>70.000</td>
          </tr>
          <tr>
            <td>BAÑO SUPER SUPER DOGGIE</td>
            <td>80.000</td>
          </tr>
          <tr>
            <td>TOTAL MINI DOGGIE</td>
            <td>85.000</td>
          </tr>
          <tr>
            <td>TOTAL SUPER DOGGIE</td>
            <td>110.000</td>
          </tr>
          <tr>
            <td>TOTAL PROTECT MINI DOGGIE</td>
            <td>105.000</td>
          </tr>
          <tr>
            <td>TOTAL PROTECT SUPER DOGGIE</td>
            <td>130.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePrices;


