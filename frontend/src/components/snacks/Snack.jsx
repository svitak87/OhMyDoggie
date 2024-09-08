import React from "react";
import styles from "./Snack.module.css"

const Snack = ({title, image}) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={image} alt={`${title} logo`} className={styles.image} />
      </div>
      <div className={styles.text_container}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  );
};

export default Snack;
