import React from "react";
import styles from "./Intro.module.css";
import black_dog from "../../assets/black_dog.png";
import ohMyDoggie from "../../assets/logo front.png";

const Intro = () => {

  return (
    <section className={styles.container}>
      <header className={styles.intro_container}>
        <h3 className={styles.intro}>
          ¡Qué suerte tenemos! ¡Nos descubriste!
        </h3>
        <h1 className={styles.title}>
          <span className={styles.hiddenText}>OH MY DOGGIE</span>
          <img
            src={ohMyDoggie}
            alt="Logotipo de OH MY DOGGIE"
            className={styles.ohMyDoggie}
          />
        </h1>
      </header>
      
      <figure className={styles.dog_container}>
        <img
          src={black_dog}
          alt="Perro negro feliz con accesorio OH MY DOGGIE"
          className={styles.dog}
        />
      </figure>
    </section>
  );
};

export default Intro;



  {/* <p className={styles.welcomeMessage}>
    🐾 Todo para tu mascota, con amor y cuidado. Tienda de mascotas
    con productos únicos. 🛒 🛁 Servicio de baño y spa para consentirlos. 🐶
    🚚 Transporte seguro hasta tu puerta. 🚪<br /> 🌟Cuidamos de ellos, como
    parte de nuestra familia.
  </p> */}