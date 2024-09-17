import React from "react";
import styles from "./DogServicex.module.css";

const DogServicex = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default DogServicex;
