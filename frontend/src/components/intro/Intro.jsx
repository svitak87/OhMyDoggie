import React, { useState, useEffect } from "react";
import styles from "./Intro.module.css";
import black_dog from "../../assets/black_dog.png";
import ohMyDoggie from "../../assets/oh_my_doggie.jpg";

const Intro = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.intro_container}>
        <h3 className={styles.intro}>¡Hola, bienvenidos a </h3>
        <h1 className={styles.title}>
          <span className={styles.hiddenText}>OH MY DOGGIE</span>
          <img
            src={ohMyDoggie}
            alt="OH MY DOGGIE oh my doggie"
            className={styles.ohMyDoggie}
          />
        </h1>
        <p className={styles.welcomeMessage}>
          🐾 Todo para tu mascota, con amor y cuidado. Tienda de mascotas
          con productos únicos. 🛒 🛁 Servicio de baño y spa para consentirlos. 🐶
          🚚 Transporte seguro hasta tu puerta. 🚪<br /> 🌟Cuidamos de ellos, como
          parte de nuestra familia.
        </p>
      </div>
      <div className={styles.dog_container}>
        <img
          src={black_dog}
          alt="perro negro feliz con accesorio OH MY DOGGIE"
          className={styles.dog}
        />
      </div>
    </div>
  );
};

export default Intro;
