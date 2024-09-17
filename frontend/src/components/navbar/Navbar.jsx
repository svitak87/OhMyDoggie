import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo_ohmydoggie.png";
import Marcas from "../marcas/Marcas";
import Snacks from "../snacks/Snacks";
import { Link } from "react-router-dom";
import DogsServices from "../dogsServices/DogsServices";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [brands, setBrands] = useState(false);
  const [snacks, setSnacks] = useState(false);
  const [services, setServices] = useState(false);
  const menuRef = useRef(null);
  const submenuRef = useRef(null);

  const handleNosotros = () => {
    const section = document.getElementById("nosotros");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmenu = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleBrands = () => {
    setBrands((prev) => !prev);
  }
  const handleSnacks = () => {
    setSnacks((prev) => !prev);
  }

  const handleServices = () => {
    setServices((prev) => !prev);
  }

  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
      setShowSubmenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 660);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.header_container}>
        <nav className={styles.navbar_container} ref={menuRef}>
          <div className={styles.left_navbar_container}>
            <div className={styles.logo_container}>
              <img src={logo} className={styles.logo} alt="Logo Oh myDoggie" />
            </div>
          </div>
          {isMobile ? (
            <div className={styles.menu_container}>
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
                      <li className={styles.list_items}>Agéndate</li>
                    </Link>
                    <Link to="/login" className={styles.link}>
                      <li className={styles.list_items}>Gestión</li>
                    </Link>
                    <li onClick={handleSubmenu} className={styles.list_items}>
                      Portafolio
                      {showSubmenu && (
                        <ul className={styles.submenu_items}>
                          <li className={styles.submenu_item} onClick={handleBrands}>Alimento</li>
                          <li className={styles.submenu_item} onClick={handleSnacks}>Snacks y accesorios</li>
                          <li className={styles.submenu_item} onClick={handleServices}>Servicios</li>
                        </ul>
                      )}
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
                  <li>Agéndate</li>
                </Link>
                <li onClick={handleSubmenu}>
                  Portafolio
                  {showSubmenu && (
                    <ul className={styles.submenu_items}>
                      <li className={styles.submenu_item} onClick={handleBrands}>Alimento</li>
                      <li className={styles.submenu_item} onClick={handleSnacks}>Snacks y accesorios</li>
                      <li className={styles.submenu_item} onClick={handleServices}>Servicios</li>
                    </ul>
                  )}
                </li>
                <Link to="/login" className={styles.link}>
                  <li>Gestión</li>
                </Link>
              </ul>
            </div>
          )}
        </nav>
      </header>
      {brands && <Marcas />}
      {snacks && <Snacks />}
      {services && <DogsServices />}
    </>
  );
};

export default Navbar;
