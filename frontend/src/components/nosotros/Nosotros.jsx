import nosotrosImage from "../../assets/nosotros_image.png";
import styles from "./Nosotros.module.css";

const Nosotros = () => {
  return (
    <>
      <div className={styles.container} id="nosotros">
        <div className={styles.left_container}>
          <h2 className={styles.title}>¿Quiénes somos?</h2>
          <p className={styles.description}>
            Somos un equipo apasionado por el bienestar y la felicidad de tu
            mascota, ubicados en Bogotá y con distribución y servicios para todo
            el país. Explora nuestra amplia variedad de alimentos, snacks,
            juguetes, accesorios y servicios integrales, con toda la confianza,
            seguridad, disponibilidad y cariño, entendiendo las necesidades
            únicas de todos los integrantes de tu familia. Contáctanos,
            visítanos y descubre cómo podemos ayudarte a cuidar y consentir
            a tus mejores amigos, en este mundo mágico de OhmyDoggie!!
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
