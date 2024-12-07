import React from "react";
import styles from "./DogServicex.module.css";

const DogServicex = ({
  title,
  description,
  spaIcon,
  doggieMovilIcon,
  recreationIcon,
  othersIcon,
}) => {
  const gettingIcon = () => {
    switch (title) {
      case "Spa y peluquería":
        return spaIcon;

      case "Doggie móvil":
        return doggieMovilIcon;

      case "Paseos y recreación":
        return recreationIcon;

      case "Otros":
        return othersIcon;
      default:
        return null
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.icon}>{gettingIcon()}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default DogServicex;
