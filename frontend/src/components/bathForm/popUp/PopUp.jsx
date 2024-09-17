import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopUp.module.css";

const PopUp = () => {
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
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>¡Tu turno ha sido agendado!</h2>
        <button className={styles.button} onClick={handleClick}>
          OK!
        </button>
      </div>
    </div>
  );
};

export default PopUp;
