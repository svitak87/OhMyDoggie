import React from "react";
import animalOne from "/dogsImages/cat_one.png";
import animalTwo from "/dogsImages/dog_one.png";
import animalThree from "/dogsImages/dog_two.png";
import styles from "./Animals.module.css";

const Animals = () => {
  return (
    <>
      <ul className={styles.container}>
        <li>
          <h2 className={styles.atribute}>Bellos</h2>
          <img
            src={animalOne}
            alt="foto_de_gato"
            loading="lazy"
            className={styles.animal}
          />
        </li>
        <li>
        <h2 className={styles.atribute}>Preciosos</h2>
          <img
            src={animalTwo}
            alt="foto_de_perro"
            loading="lazy"
            className={styles.animal}
          />
        </li>
        <li>
        <h2 className={styles.atribute}>Hermosos</h2>
          <img
            src={animalThree}
            alt="foto_de_perro"
            loading="lazy"
            className={styles.animal}
          />
        </li>
      </ul>
    </>
  );
};

export default Animals;
