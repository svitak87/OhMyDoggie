import React from "react";
import logo from "../../assets/logo_ohmydoggie.png";
import whatsappQR from "../../assets/qrcode-573505107369.jpg";
import styles from "./FooterMobile.module.css";

const FooterMobile = () => {
  const phoneNumber = "+573505107369";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  return (
    <>
      <div className={styles.footer_container}>
        <div className={styles.logo_container}>
          <img
            src={logo}
            alt="logo oh my doggie"
            className={styles.logo}
            loading="lazy"
          />
        </div>
        <div className={styles.contact_container}>
          <div className={styles.contact}>
            <h3>Nuestro local</h3>
            <p>Bogotá, Puente Largo, Calle 106 #54 - 93 local 3</p>
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
          </div>
          <div className={styles.qr_container}>
            <img
              src={whatsappQR}
              alt="QR_whatsapp_ohmydoggie"
              className={styles.whatsappQR}
              loading="lazy"
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
