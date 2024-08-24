import React, { useEffect } from "react";
import styles from "./PopUpError.module.css";
import { useNavigate } from "react-router-dom";

const PopUpError = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.title}>¡Oops!</h2>
          <p className={styles.message}>
            Ante cualquier duda sobre este acceso, comunícate al:
            (+57)350-510-73-69
          </p>
          <button className={styles.button} onClick={handleClick}>
            OK!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpError;
