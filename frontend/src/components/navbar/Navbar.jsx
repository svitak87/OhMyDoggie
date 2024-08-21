import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo_ohmydoggie.png";
import Marcas from "../marcas/Marcas";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [nosotros, setNosotros] = useState(false);
  const [services, setServices] = useState(false);
  const [brands, setBrands] = useState(false);
  const menuRef = useRef(null);

  const handleNosotros = () => {
    const section = document.getElementById("nosotros");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleServices = () => {
    setServices((prev) => !prev);
  };

  const handleBrands = () => {
    setBrands((prev) => !prev);
  };
  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 660);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.header_container}>
        <nav className={styles.navbar_container}>
          <div className={styles.left_navbar_container}>
            <div className={styles.logo_container}>
              <img src={logo} className={styles.logo} alt="Logo Oh myDoggie" />
            </div>
          </div>
          {isMobile ? (
            <div className={styles.menu_container} ref={menuRef}>
              <FontAwesomeIcon
                icon={faBars}
                className={styles.menu_icon}
                onClick={handleMenu}
              />
              {openMenu && (
                <>
                  <ul className={styles.menu_items}>
                    <li onClick={handleNosotros} className={styles.list_items}>
                      Nosotros
                    </li>
                    <Link to="/reserva" className={styles.link}>
                      <li className={styles.list_items}>Baño y Peluquería</li>
                    </Link>
                    <li onClick={handleBrands} className={styles.list_items}>
                      Marcas
                    </li>
                  </ul>
                </>
              )}
            </div>
          ) : (
            <div className={styles.right_navbar_container}>
              <ul className={styles.list_container}>
                <li onClick={handleNosotros}>Nosotros</li>
                <Link to="/reserva" className={styles.link}>
                  <li>Baño y Peluquería</li>
                </Link>
                <li onClick={handleBrands}>Marcas</li>
              </ul>
            </div>
          )}
        </nav>
      </header>
      {brands && <Marcas />}
    </>
  );
};

export default Navbar;
