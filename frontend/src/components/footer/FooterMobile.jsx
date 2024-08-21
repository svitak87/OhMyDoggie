import React from "react";
import logo from "../../assets/logo_ohmydoggie.png";
import whatsappQR from "../../assets/whatsapp.png";
import styles from "./FooterMobile.module.css";

const FooterMobile = () => {
  return (
    <>
      <div className={styles.footer_container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="logo oh my doggie" className={styles.logo} />
        </div>
        <div className={styles.contact_container}>
          <div className={styles.contact}>
            <h3>Nuestro local</h3>
            <p>Bogotá, Puente Largo, Calle 106 #54 - 93 local 3</p>
            <h3>WhatsApp</h3>
            <p>(+57)350-510-73-69</p>
          </div>
          <div className={styles.qr_container}>
            <img
              src={whatsappQR}
              alt="QR_whatsapp_ohmydoggie"
              className={styles.whatsappQR}
            />
          </div>
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
      </div>
    </>
  );
};

export default FooterMobile;
