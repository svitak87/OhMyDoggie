import React, { useState, useEffect } from "react";
import nosotrosImage from "../../assets/nosotros_image.png";
import styles from "./Nosotros.module.css";

const Nosotros = () => {
  return (
    <>
      <div className={styles.container} id="nosotros">
        <div className={styles.left_container}>
          <h2 className={styles.title}>¿Quiénes somos?</h2>
          <p className={styles.description}>
            Somos un emprendimiento apasionado por el bienestar y la felicidad
            de tu mascota. Ubicados en Bogotá, nos comprometemos a ofrecer una
            amplia variedad de alimentos de alta calidad, juguetes, accesorios y
            snacks para tu mejor amigo. Nuestro equipo está
            dedicado a brindar un servicio excepcional, entendiendo las
            necesidades únicas de cada mascota y su dueño. Además, ofrecemos
            servicios de baño y peluquería para que tu peludo siempre luzca y se
            sienta genial. ¡Visítanos y descubre cómo podemos ayudarte a cuidar
            y consentir a tu mejor amigo!
          </p>
        </div>
        <div className={styles.image_container}>
          <img
            src={nosotrosImage}
            className={styles.image}
            alt="imagen de Nosotros perritos posando OHMYDOGGIE"
          />
        </div>
      </div>
    </>
  );
};

export default Nosotros;
