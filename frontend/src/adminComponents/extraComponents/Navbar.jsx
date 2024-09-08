import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo_ohmydoggie.png";
import { useDispatch } from "react-redux";
import { logOutAdmin } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutAdmin());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <div className={styles.logo_container}>
          <img src={logo} className={styles.logo} alt="Logo Oh myDoggie" />
        </div>
      </div>
      <div className={styles.right_container}>
        <button className={styles.button} type="button" onClick={handleLogOut}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
