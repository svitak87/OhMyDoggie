import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/logo_footer.jpg";
import whatsappQR from "../../assets/qrcode-573505107369.jpg";
import FooterMobile from "./FooterMobile";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  const phoneNumber = "+57 3505107369";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 660);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollingTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };
  return (
    <>
      {isMobile ? (
        <FooterMobile />
      ) : (
        <footer className={styles.footer_container}>
          <div className={styles.logo_container}>
            <img
              src={logo}
              alt="logo oh my doggie"
              className={styles.logo}
              onClick={scrollingTop}
              loading="lazy"
            />
          </div>
          <div className={styles.social_media_container}>
            <h2>Síguenos en</h2>
            <div className={styles.icons}>
              <a
                href="https://www.facebook.com/profile.php?id=100063778320772"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/ohmydoggiecol/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className={styles.contact_container}>
            <h3>Nuestro local</h3>
            <p>Bogotá, Puente Largo, Calle 106 #54 - 93 local 3</p>
            <h3>WhatsApp</h3>
            <h3>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsapp_link}
              >
                {phoneNumber}
              </a>
            </h3>
            <img
              src={whatsappQR}
              alt="QR_whatsapp_ohmydoggie"
              className={styles.whatsappQR}
              loading="lazy"
            />
          </div>
        </footer>
      )}
      <div className={styles.rights_container}>
        <p>
          &copy; 2024 Oh My Doggie. Todos los derechos reservados. Desarrollado
          por{" "}
          <a href="https://frontend-nu-henna.vercel.app/" target="_blanck">
            Svitak Dev
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
