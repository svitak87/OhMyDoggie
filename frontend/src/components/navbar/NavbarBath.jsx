import React from "react";
import styles from "./NavbarBath.module.css";
import logo from "../../assets/logo_ohmydoggie.png";
import { Link } from "react-router-dom";

const NavbarBath = () => {
  return (
    <div className={styles.container}>
      <Link to='/'>
        <img src={logo} alt="Oh My Doggie logo" className={styles.logo} />
      </Link>
    </div>
  );
};

export default NavbarBath;
